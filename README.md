# MovieMood

Веб-застосунок для підбору фільмів під настрій. Навчальний проєкт (лабораторні роботи 3–7).

**Стек:** React 18, Vite, React Router 6, CSS Modules (без CSS-фреймворків), мок-бекенд на Node.js.

## Запуск

```bash
npm install        # встановлює залежності і підключає git-хуки (Husky)
npm run dev:all    # бекенд (порт 3001) + фронтенд → http://localhost:5173
# або у двох терміналах: npm run server  та  npm run dev
npm run build      # збірка у папку dist
npm run preview    # перегляд зібраної версії
```

## Якість коду

| Команда                | Що робить                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run lint`         | перевірка ESLint (без помилок і попереджень)                        |
| `npm run format`       | автоформатування Prettier                                           |
| `npm run format:check` | лише перевірка форматування (нічого не змінює)                      |
| `npm run cypress:open` | e2e-тести Cypress (потрібно, щоб паралельно працював `npm run dev`) |

**Husky.** Перед кожним `git commit` автоматично виконується `.husky/pre-commit`:
`npm run lint` та `npm run format:check`. Якщо є помилка, коміт скасовується.
Якщо скасовано через форматування, виконай `npm run format`, потім `git add -A` і повтори коміт.
Хук можна пропустити лише у крайньому разі: `git commit --no-verify`.

Хуки підключає `npm install` (скрипт `prepare` → `scripts/setup-husky.mjs`).
Скрипт працює і тоді, коли папка `.git` лежить на рівень вище за проєкт.

## Маршрутизація (лабораторна №5)

Використано `react-router-dom`. Усі адреси описані в `src/router/routes.js`,
а таблиця «адреса → сторінка» — в `src/router/AppRouter.jsx`.

| Адреса            | Сторінка           | Примітка                                       |
| ----------------- | ------------------ | ---------------------------------------------- |
| `/`               | `HomePage`         | головна                                        |
| `/catalog`        | `CatalogPage`      | каталог з фільтрами                            |
| `/movie/:movieId` | `MovieDetailsPage` | `:movieId` береться з адреси (`useParams`)     |
| `/profile`        | `ProfilePage`      | гість бачить запрошення увійти                 |
| `*` (усе інше)    | `NotFoundPage`     | сторінка 404; також для неіснуючого `:movieId` |

Усі сторінки вкладені в `AppLayout` (шапка, фон, `<Outlet />`), тому шапка не перемальовується
під час переходів. Меню в шапці побудоване на `NavLink`, тож активний пункт підсвічується сам.

> Для продакшн-хостингу сервер має віддавати `index.html` на будь-яку адресу
> (SPA fallback), інакше оновлення сторінки на `/catalog` дасть 404 від сервера.
> `npm run dev` і `npm run preview` це роблять самі.

## Структура `src`

```
src/
├── main.jsx            # точка входу: <BrowserRouter><App/></BrowserRouter>
├── App.jsx             # спільний стан (мова, тема, обране...) + <AppRouter/> + модальні вікна
├── router/             # routes.js (адреси), AppRouter.jsx (таблиця маршрутів)
├── pages/              # Home, Catalog, MovieDetails, Profile, NotFound
├── components/         # layout, common, movie, mood, home, filters, profile, modals
├── data/               # мок-дані
├── utils/              # допоміжні функції
└── styles/             # reset, змінні (теми), глобальні утиліти
```

## Бізнес-логіка та API (лабораторна №6)

Мок-бекенд `server/server.js` (чистий Node.js, дані в `server/db.json`, створюється при першому запуску).
Vite проксує `/api/*` на `http://localhost:3001`.

**Демо-акаунт:** `demo@moviemood.com` / `demo1234`. Інші акаунти створюються через реєстрацію
(пароль від 6 символів, паролі хешуються `scrypt`).

| Метод і адреса                          | Призначення                                      |
| --------------------------------------- | ------------------------------------------------ |
| `POST /api/auth/register`, `/login`     | реєстрація / вхід → `{ token, user }`            |
| `GET /api/auth/me`, `POST /logout`      | поточний користувач / вихід                      |
| `PATCH /api/profile`                    | редагування профілю                              |
| `GET /api/movies?search&mood&genre&…`   | каталог: пошук, фільтри, сортування на сервері   |
| `GET /api/movies/:id`, `/recommendations` | фільм / рекомендації під настрій               |
| `/api/favorites`, `/watchlist`, `/watched` | списки користувача (GET, POST/DELETE `/:id`)  |
| `/api/collections` (+ `/:id/movies`)    | добірки: створення, видалення, фільми в добірці  |

**Клієнт** (`src/`):

- `services/api.js` — єдиний `fetch`-клієнт (токен, помилки `ApiError`, подія про закінчення сесії);
  `authService`, `movieService`, `profileService`, `collectionService`, `storageService` — шар сервісів.
- Хуки: `useFetch` (GET), `usePost` (POST/PATCH), `useAuth`, `useMovies`/`useMovie`/`useRecommendations`,
  `useMovieFilters`, `useFavorites`/`useWatchlist`/`useWatched` (оптимістичне оновлення), `useCollections`,
  `useDebounce`, `useLocalStorage`, `useModal`, `useLanguage`, `useToast`.
- Контексти: `LanguageContext`, `ToastContext`, `AuthContext` (сесія зберігається токеном у `localStorage`),
  `ModalContext`, `MovieContext` (списки й добірки з перевіркою авторизації).
- Гість бачить сайт, але лайк / список / добірка відкривають вікно входу; профіль недоступний без акаунта.

Тести: `npm run cypress:open` (потрібні запущені `npm run server` і `npm run dev`).
