import { useState } from 'react';
import type { Movie } from '../data/movies';
import type { Language, UserProfile } from '../App';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  favoriteIds: number[];
  watchlistIds: number[];
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  onOpenMovie: (movie: Movie) => void;
  language: Language;
  profile: UserProfile;
  isAuthenticated: boolean;
  onEdit: () => void;
  onLogout: () => void;
  onAuth: () => void;
}

type Tab =
  | 'favorites'
  | 'watchlist'
  | 'collections';

const collections = [
  {
    title: 'Вечір хорорів у п’ятницю',
    count: 12,
    status: 'Приватна',
    ids: [10, 2, 4, 8],
  },
  {
    title: 'Затишні осінні фільми',
    count: 8,
    status: 'Публічна',
    ids: [1, 5, 7, 9],
  },
  {
    title: 'Крута фантастика',
    count: 16,
    status: 'Публічна',
    ids: [4, 6, 8, 2],
  },
];

export default function ProfilePage(props: Props) {
  const ua = props.language === 'ua';
  const [tab, setTab] = useState<Tab>('favorites');
  const [watched, setWatched] = useState<number[]>([
    6,
  ]);

  const visible = props.movies.filter((movie) =>
    (
      tab === 'favorites'
        ? props.favoriteIds
        : props.watchlistIds
    ).includes(movie.id),
  );

  const toggleWatched = (movieId: number) => {
    setWatched((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    );
  };

  if (!props.isAuthenticated) {
    return (
      <main className="section-wrap profile">
        <section className="profile-guest">
          <span className="profile-guest__icon">
            ○
          </span>

          <span className="eyebrow">
            {ua
              ? 'ОСОБИСТИЙ КІНОПРОСТІР'
              : 'YOUR CINEMA SPACE'}
          </span>

          <h1>
            {ua
              ? 'Увійди, щоб відкрити профіль'
              : 'Sign in to open your profile'}
          </h1>

          <p>
            {ua
              ? 'Зберігай улюблене, створюй добірки та синхронізуй список перегляду.'
              : 'Save favorites, create collections and sync your watchlist.'}
          </p>

          <button
            className="button button--primary"
            onClick={props.onAuth}
          >
            {ua
              ? 'Увійти / Зареєструватися'
              : 'Sign in / Register'}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="section-wrap profile">
      <section className="profile-hero">
        <div className="profile-hero__glow" />

        <div className="profile-hero__person">
          <div className="profile-avatar">
            {props.profile.avatar ? (
              <img
                src={props.profile.avatar}
                alt={props.profile.name}
              />
            ) : (
              props.profile.initials
            )}

            <span />
          </div>

          <div>
            <span className="profile-badge">
              {ua ? 'КІНОМАТОР' : 'CINEMANIAC'}
            </span>

            <h1>{props.profile.name}</h1>

            <p>
              {props.profile.handle} ·{' '}
              {props.profile.bio}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <strong>
              {props.favoriteIds.length}
            </strong>
            <span>
              {ua ? 'Вподобано' : 'Favorites'}
            </span>
          </div>

          <div>
            <strong>
              {props.watchlistIds.length}
            </strong>
            <span>
              {ua ? 'У списку' : 'Watchlist'}
            </span>
          </div>

          <div>
            <strong>{collections.length}</strong>
            <span>
              {ua ? 'Добірок' : 'Collections'}
            </span>
          </div>
        </div>

        <div className="profile-hero__actions">
          <button
            className="button button--glass"
            onClick={props.onEdit}
          >
            {ua
              ? 'Редагувати профіль'
              : 'Edit profile'}
          </button>

          <button
            className="profile-logout"
            onClick={props.onLogout}
          >
            {ua
              ? 'Вийти з акаунта'
              : 'Log out'}
          </button>
        </div>
      </section>

      <div
        className="profile-tabs"
        role="tablist"
        aria-label={
          ua
            ? 'Розділи профілю'
            : 'Profile sections'
        }
      >
        <button
          role="tab"
          aria-selected={tab === 'favorites'}
          onClick={() => setTab('favorites')}
          className={
            tab === 'favorites' ? 'active' : ''
          }
        >
          ♥{' '}
          {ua
            ? 'Улюблені фільми'
            : 'Favorite movies'}
          <span>{props.favoriteIds.length}</span>
        </button>

        <button
          role="tab"
          aria-selected={tab === 'watchlist'}
          onClick={() => setTab('watchlist')}
          className={
            tab === 'watchlist' ? 'active' : ''
          }
        >
          ★ {ua ? 'Заплановані' : 'Watchlist'}
          <span>{props.watchlistIds.length}</span>
        </button>

        <button
          role="tab"
          aria-selected={tab === 'collections'}
          onClick={() => setTab('collections')}
          className={
            tab === 'collections' ? 'active' : ''
          }
        >
          ▣ {ua ? 'Мої добірки' : 'My collections'}
          <span>{collections.length}</span>
        </button>
      </div>

      {tab !== 'collections' && (
        <section className="profile-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {ua
                  ? tab === 'favorites'
                    ? 'ТЕ, ЩО ТИ ЛЮБИШ'
                    : 'НА НАСТУПНИЙ ВЕЧІР'
                  : tab === 'favorites'
                    ? 'WHAT YOU LOVE'
                    : 'FOR YOUR NEXT NIGHT'}
              </span>

              <h2>
                {ua
                  ? tab === 'favorites'
                    ? 'Улюблені фільми'
                    : 'Заплановані до перегляду'
                  : tab === 'favorites'
                    ? 'Favorite movies'
                    : 'Planned to watch'}
              </h2>
            </div>
          </div>

          <div className="movie-grid movie-grid--five">
            {visible.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  movie={movie}
                  isFavorite={props.favoriteIds.includes(
                    movie.id,
                  )}
                  isWatchlisted={props.watchlistIds.includes(
                    movie.id,
                  )}
                  onFavorite={props.onFavorite}
                  onWatchlist={props.onWatchlist}
                  onOpenMovie={props.onOpenMovie}
                  language={props.language}
                  compact
                />

                {tab === 'watchlist' && (
                  <label className="watched-toggle">
                    <input
                      type="checkbox"
                      checked={watched.includes(movie.id)}
                      onChange={() =>
                        toggleWatched(movie.id)
                      }
                    />

                    <span />

                    {ua ? 'Переглянуто' : 'Watched'}
                  </label>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'collections' && (
        <section className="profile-content">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {ua
                  ? 'ЗБЕРИ ВЛАСНУ АТМОСФЕРУ'
                  : 'CURATE YOUR ATMOSPHERE'}
              </span>

              <h2>
                {ua
                  ? 'Мої добірки'
                  : 'My collections'}
              </h2>
            </div>

            <button className="button button--primary">
              ＋{' '}
              {ua
                ? 'Створити нову добірку'
                : 'Create new collection'}
            </button>
          </div>

          <div className="collections-grid">
            {collections.map((collection) => (
              <article
                className="collection-card"
                key={collection.title}
              >
                <div className="collection-card__covers">
                  {collection.ids.map((id) => {
                    const movie = props.movies.find(
                      (item) => item.id === id,
                    );

                    return movie ? (
                      <img
                        key={id}
                        src={movie.poster}
                        alt=""
                      />
                    ) : null;
                  })}
                </div>

                <div className="collection-card__info">
                  <div>
                    <span>{collection.status}</span>
                    <h3>{collection.title}</h3>
                    <p>
                      {collection.count}{' '}
                      {ua ? 'фільмів' : 'movies'}
                    </p>
                  </div>

                  <button
                    aria-label={
                      ua
                        ? 'Більше дій'
                        : 'More actions'
                    }
                  >
                    •••
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
