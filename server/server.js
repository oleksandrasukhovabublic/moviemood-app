// Мок-бекенд MovieMood на чистому Node.js (без зовнішніх залежностей).
// Запуск: npm run server  (http://localhost:3001)
import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { movies } from '../src/data/movies.js';
import { movieTitle } from '../src/utils/movieLocale.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3001;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;

/* ---------- "База даних" у JSON-файлі ---------- */

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const candidate = crypto.scryptSync(password, salt, 32);
  return crypto.timingSafeEqual(candidate, Buffer.from(hash, 'hex'));
}

function seedDb() {
  return {
    users: [
      {
        id: 'u1',
        email: 'demo@moviemood.com',
        password: hashPassword('demo1234'),
        name: 'Саша Коваль',
        handle: '@sasha.movies',
        bio: 'У пошуках історій, які залишаються надовго.',
        initials: 'СК',
        avatar: '',
        favorites: [2, 4, 9],
        watchlist: [1, 6, 8, 10],
        watched: [6],
        collections: [
          { id: 'horror-night', title: 'Вечір хорорів', ids: [10, 2, 4, 8] },
          { id: 'cozy-autumn', title: 'Затишна осінь', ids: [1, 5, 7, 9] },
          { id: 'great-sci-fi', title: 'Крута фантастика', ids: [4, 6, 8, 2] },
        ],
      },
    ],
    sessions: {}, // token -> userId
  };
}

let db = fs.existsSync(DB_FILE)
  ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
  : seedDb();

const saveDb = () => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
saveDb();

/* ---------- Допоміжні функції ---------- */

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const publicUser = ({ password: _password, ...user }) => user;

const makeInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      // аватар приходить як data-URL, тому ліміт щедрий
      if (raw.length > 5_000_000) reject(new HttpError(413, 'Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new HttpError(400, 'Invalid JSON'));
      }
    });
  });
}

function getUser(req, { required = true } = {}) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const userId = token && db.sessions[token];
  const user = userId && db.users.find((item) => item.id === userId);

  if (!user && required) throw new HttpError(401, 'Необхідна авторизація');
  return user || null;
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString('hex');
  db.sessions[token] = user.id;
  saveDb();
  return token;
}

/* ---------- Бізнес-логіка ---------- */

// Пошук + фільтри + сортування каталогу
function queryMovies(params) {
  const search = (params.get('search') || '').trim().toLowerCase();
  const mood = params.get('mood') || 'all';
  const genre = params.get('genre') || 'all';
  const year = Number(params.get('year')) || 0;
  const rating = Number(params.get('rating')) || 0;
  const sort = params.get('sort') || 'popular';

  return movies
    .filter((movie) => {
      if (movie.year < year || movie.rating < rating) return false;
      if (genre !== 'all' && !movie.genres.includes(genre)) return false;
      if (mood !== 'all' && !movie.moods.includes(mood)) return false;
      if (!search) return true;
      return [movie.title, movieTitle(movie, 'ua'), movie.director, ...movie.genres, ...movie.cast].some(
        (field) => field.toLowerCase().includes(search),
      );
    })
    .sort((a, b) =>
      sort === 'rating'
        ? b.rating - a.rating
        : sort === 'year'
          ? b.year - a.year
          : b.id - a.id,
    );
}

// Рекомендації: збіг настрою + жанри, які користувач вже любить
function recommend(mood, user) {
  const likedIds = user ? [...user.favorites, ...user.watched] : [];
  const genreWeight = {};
  movies
    .filter((movie) => likedIds.includes(movie.id))
    .forEach((movie) =>
      movie.genres.forEach((g) => {
        genreWeight[g] = (genreWeight[g] || 0) + 1;
      }),
    );

  return movies
    .filter((movie) => !user || !user.watched.includes(movie.id))
    .map((movie) => {
      const moodScore = mood && movie.moods.includes(mood) ? 3 : 0;
      const genreScore = movie.genres.reduce((sum, g) => sum + (genreWeight[g] || 0), 0);
      const matchPercent = Math.min(99, Math.round(60 + moodScore * 8 + genreScore * 3 + movie.rating));
      return { ...movie, score: moodScore + genreScore * 0.5 + movie.rating / 10, match: matchPercent };
    })
    .filter((movie) => !mood || movie.moods.includes(mood))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

const LISTS = ['favorites', 'watchlist', 'watched'];

/* ---------- Роутер ---------- */

async function handle(req, res, url) {
  const { pathname, searchParams } = url;
  const method = req.method;
  const parts = pathname.split('/').filter(Boolean); // ['api', ...]

  if (parts[0] !== 'api') throw new HttpError(404, 'Not found');
  const [, resource, id, sub, subId] = parts;

  if (resource === 'health') return { data: { status: 'ok' } };

  // ----- Auth -----
  if (resource === 'auth') {
    if (id === 'register' && method === 'POST') {
      const body = await readBody(req);
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      if (!name || !email || !password) throw new HttpError(400, 'Заповніть усі поля');
      if (!EMAIL_PATTERN.test(email)) throw new HttpError(400, 'Введіть коректний email');
      if (password.length < PASSWORD_MIN_LENGTH)
        throw new HttpError(400, `Пароль має містити щонайменше ${PASSWORD_MIN_LENGTH} символів`);
      if (db.users.some((u) => u.email === email))
        throw new HttpError(409, 'Користувач з таким email вже існує');

      const user = {
        id: crypto.randomUUID(),
        email,
        password: hashPassword(password),
        name,
        handle: `@${email.split('@')[0]}`,
        bio: '',
        initials: makeInitials(name),
        avatar: '',
        favorites: [],
        watchlist: [],
        watched: [],
        collections: [],
      };
      db.users.push(user);
      return { status: 201, data: { token: createSession(user), user: publicUser(user) } };
    }

    if (id === 'login' && method === 'POST') {
      const body = await readBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const user = db.users.find((u) => u.email === email);
      // однакове повідомлення для «немає такого email» і «невірний пароль» — так безпечніше
      if (!user || !verifyPassword(password, user.password))
        throw new HttpError(401, 'Невірний email або пароль');
      return { data: { token: createSession(user), user: publicUser(user) } };
    }

    if (id === 'me' && method === 'GET') return { data: publicUser(getUser(req)) };

    if (id === 'logout' && method === 'POST') {
      const token = (req.headers.authorization || '').slice(7);
      delete db.sessions[token];
      saveDb();
      return { status: 204 };
    }
  }

  // ----- Профіль -----
  if (resource === 'profile' && method === 'PATCH') {
    const user = getUser(req);
    const { name, handle, bio, avatar } = await readBody(req);
    if (name !== undefined && !name.trim()) throw new HttpError(400, "Ім'я не може бути порожнім");
    if (name !== undefined) {
      user.name = name.trim();
      user.initials = makeInitials(user.name);
    }
    if (handle !== undefined) {
      const clean = String(handle).trim().replace(/^@+/, '');
      if (!clean) throw new HttpError(400, "Ім'я користувача не може бути порожнім");
      user.handle = `@${clean}`;
    }
    if (bio !== undefined) user.bio = String(bio).slice(0, 300);
    if (avatar !== undefined) user.avatar = avatar;
    saveDb();
    return { data: publicUser(user) };
  }

  // ----- Фільми -----
  if (resource === 'movies' && method === 'GET') {
    if (id === 'recommendations') {
      return { data: recommend(searchParams.get('mood'), getUser(req, { required: false })) };
    }
    if (id) {
      const movie = movies.find((m) => m.id === Number(id));
      if (!movie) throw new HttpError(404, 'Фільм не знайдено');
      return { data: movie };
    }
    return { data: queryMovies(searchParams) };
  }

  // ----- Улюблені / Заплановані / Переглянуті -----
  if (LISTS.includes(resource)) {
    const user = getUser(req);
    if (method === 'GET' && !id) return { data: user[resource] };
    const movieId = Number(id);
    if (!movies.some((m) => m.id === movieId)) throw new HttpError(404, 'Фільм не знайдено');
    if (method === 'POST' && !user[resource].includes(movieId)) user[resource].push(movieId);
    if (method === 'DELETE') user[resource] = user[resource].filter((x) => x !== movieId);
    saveDb();
    return { data: user[resource] };
  }

  // ----- Добірки -----
  if (resource === 'collections') {
    const user = getUser(req);

    if (!id && method === 'GET') return { data: user.collections };

    if (!id && method === 'POST') {
      const { title } = await readBody(req);
      if (!title || !title.trim()) throw new HttpError(400, 'Вкажіть назву добірки');
      if (user.collections.some((c) => c.title.toLowerCase() === title.trim().toLowerCase()))
        throw new HttpError(409, 'Добірка з такою назвою вже існує');
      const collection = { id: crypto.randomUUID(), title: title.trim(), ids: [] };
      user.collections.push(collection);
      saveDb();
      return { status: 201, data: collection };
    }

    const collection = user.collections.find((c) => c.id === id);
    if (!collection) throw new HttpError(404, 'Добірку не знайдено');

    if (!sub && method === 'DELETE') {
      user.collections = user.collections.filter((c) => c.id !== id);
      saveDb();
      return { status: 204 };
    }

    if (sub === 'movies' && method === 'POST') {
      const { movieId } = await readBody(req);
      if (!movies.some((m) => m.id === Number(movieId))) throw new HttpError(404, 'Фільм не знайдено');
      if (!collection.ids.includes(Number(movieId))) collection.ids.push(Number(movieId));
      saveDb();
      return { data: collection };
    }

    if (sub === 'movies' && method === 'DELETE') {
      collection.ids = collection.ids.filter((x) => x !== Number(subId));
      saveDb();
      return { data: collection };
    }
  }

  throw new HttpError(404, 'Not found');
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { status = 200, data } = await handle(req, res, url);
    if (status === 204) {
      res.writeHead(204);
      return res.end();
    }
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
  } catch (error) {
    const status = error.status || 500;
    if (status === 500) console.error(error);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ message: error.message }));
  }
});

server.listen(PORT, () => console.log(`MovieMood API: http://localhost:${PORT}/api`));
