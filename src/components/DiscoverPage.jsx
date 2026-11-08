import { useMemo, useState } from 'react';
import type { Movie } from '../data/movies';
import type { Language } from '../App';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  favoriteIds: number[];
  watchlistIds: number[];
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  onOpenMovie: (movie: Movie) => void;
  language: Language;
}

const moods = [
  'Усі настрої',
  'Релакс',
  'Драйв',
  'Заплутаний сюжет',
  'Емоційний',
];

const genres = [
  'Усі жанри',
  'Фантастика',
  'Комедія',
  'Драма',
];

export default function DiscoverPage(props: Props) {
  const ua = props.language === 'ua';

  const moodLabel: Record<string, string> = ua
    ? {}
    : {
        'Усі настрої': 'All moods',
        Релакс: 'Chill',
        Драйв: 'Adrenaline',
        'Заплутаний сюжет': 'Mind bending',
        Емоційний: 'Emotional',
      };

  const genreLabel: Record<string, string> = ua
    ? {}
    : {
        'Усі жанри': 'All genres',
        Фантастика: 'Sci-Fi',
        Комедія: 'Comedy',
        Драма: 'Drama',
      };

  const [mood, setMood] = useState('Усі настрої');
  const [genre, setGenre] = useState('Усі жанри');
  const [year, setYear] = useState(1990);
  const [rating, setRating] = useState(6);
  const [sort, setSort] = useState('popular');
  const [drawerMovie, setDrawerMovie] =
    useState<Movie | null>(null);

  const filtered = useMemo(() => {
    const genreMap: Record<string, string> = {
      Фантастика: 'Sci-Fi',
      Комедія: 'Comedy',
      Драма: 'Drama',
    };

    const matchesMood = (movie: Movie) => {
      if (mood === 'Усі настрої') {
        return true;
      }

      if (mood === 'Релакс') {
        return movie.moods.includes('cozy');
      }

      if (mood === 'Драйв') {
        return movie.moods.includes('thrilling');
      }

      if (mood === 'Заплутаний сюжет') {
        return movie.genres.some((item) =>
          ['Mystery', 'Sci-Fi'].includes(item),
        );
      }

      return movie.genres.includes('Drama');
    };

    return [...props.movies]
      .filter(
        (movie) =>
          movie.year >= year && movie.rating >= rating,
      )
      .filter(
        (movie) =>
          genre === 'Усі жанри' ||
          movie.genres.includes(genreMap[genre]),
      )
      .filter(matchesMood)
      .sort((a, b) => {
        if (sort === 'rating') {
          return b.rating - a.rating;
        }

        if (sort === 'year') {
          return b.year - a.year;
        }

        return b.id - a.id;
      });
  }, [
    props.movies,
    mood,
    genre,
    year,
    rating,
    sort,
  ]);

  return (
    <main className="section-wrap catalog">
      <div className="catalog__heading">
        <span className="eyebrow">
          {ua
            ? 'ЗНАЙДИ СВОЮ ІСТОРІЮ'
            : 'FIND YOUR STORY'}
        </span>

        <h1>
          {ua ? 'Каталог фільмів' : 'Movie catalog'}
        </h1>

        <p>
          {ua
            ? 'Фільтруй за настроєм, жанром і рейтингом — ми залишимо тільки влучне.'
            : 'Filter by mood, genre and rating — we will keep only the best matches.'}
        </p>
      </div>

      <section className="filter-panel">
        <div className="filter-panel__top">
          <div className="filter-group filter-group--wide">
            <label>
              {ua ? 'НАСТРІЙ' : 'MOOD'}
            </label>

            <div className="filter-pills">
              {moods.map((item) => (
                <button
                  key={item}
                  onClick={() => setMood(item)}
                  aria-pressed={mood === item}
                  className={mood === item ? 'active' : ''}
                >
                  {moodLabel[item] ?? item}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="genre">
              {ua ? 'ЖАНР' : 'GENRE'}
            </label>

            <select
              id="genre"
              value={genre}
              onChange={(event) =>
                setGenre(event.target.value)
              }
            >
              {genres.map((item) => (
                <option key={item} value={item}>
                  {genreLabel[item] ?? item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">
              {ua ? 'СОРТУВАТИ' : 'SORT BY'}
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
            >
              <option value="popular">
                {ua
                  ? 'За популярністю'
                  : 'Popularity'}
              </option>

              <option value="rating">
                {ua ? 'За рейтингом' : 'Rating'}
              </option>

              <option value="year">
                {ua
                  ? 'За відповідністю настрою'
                  : 'Mood match'}
              </option>
            </select>
          </div>
        </div>

        <div className="filter-panel__ranges">
          <label>
            {ua ? 'РІК ВИПУСКУ' : 'RELEASE YEAR'}

            <strong>
              {ua ? 'від' : 'from'} {year}
            </strong>

            <input
              type="range"
              min="1990"
              max="2024"
              value={year}
              onChange={(event) =>
                setYear(Number(event.target.value))
              }
            />
          </label>

          <label>
            {ua ? 'РЕЙТИНГ TMDB' : 'TMDB RATING'}

            <strong>
              {ua ? 'від' : 'from'} {rating.toFixed(1)}
            </strong>

            <input
              type="range"
              min="5"
              max="9"
              step=".5"
              value={rating}
              onChange={(event) =>
                setRating(Number(event.target.value))
              }
            />
          </label>

          <span className="filter-panel__count">
            {ua ? 'Знайдено' : 'Found'}{' '}
            <strong>{filtered.length}</strong>{' '}
            {ua ? 'фільмів' : 'movies'}
          </span>
        </div>
      </section>

      <div className="movie-grid movie-grid--catalog">
        {filtered.map((movie) => (
          <div className="catalog-card" key={movie.id}>
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
            />

            <button
              className="collection-action"
              onClick={() => setDrawerMovie(movie)}
            >
              ＋{' '}
              {ua
                ? 'Додати до моєї добірки'
                : 'Add to my collection'}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <strong>
            {ua
              ? 'Нічого не знайдено'
              : 'No movies found'}
          </strong>

          <p>
            {ua
              ? 'Спробуй послабити фільтри — хороше кіно вже поруч.'
              : 'Try adjusting the filters — great cinema is close.'}
          </p>
        </div>
      )}

      {drawerMovie && (
        <div
          className="drawer-backdrop"
          onClick={() => setDrawerMovie(null)}
        >
          <aside
            className="collection-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="collection-drawer__close"
              onClick={() => setDrawerMovie(null)}
              aria-label={
                ua ? 'Закрити добірки' : 'Close collections'
              }
            >
              ×
            </button>

            <span className="eyebrow">
              {ua ? 'МОЇ ДОБІРКИ' : 'MY COLLECTIONS'}
            </span>

            <h2>
              {ua ? 'Додати фільм' : 'Add movie'}
            </h2>

            <p>
              {ua
                ? 'Обери добірку для цього фільму.'
                : 'Choose a collection for this movie.'}
            </p>

            {[
              'Вечір хорорів у п’ятницю',
              'Затишні осінні фільми',
              'Крута фантастика',
            ].map((name) => (
              <button
                className="drawer-list-item"
                key={name}
              >
                <span>▣</span>
                {name}
                <i>＋</i>
              </button>
            ))}

            <button className="button button--primary">
              ＋{' '}
              {ua
                ? 'Створити нову добірку'
                : 'Create new collection'}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
