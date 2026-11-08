import { useState } from 'react';
import type { Movie } from '../data/movies';
import type { Language } from '../App';
import MovieCard, { movieTitle } from './MovieCard';

interface Props {
  movies: Movie[];
  favoriteIds: number[];
  watchlistIds: number[];
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  onOpenCatalog: () => void;
  onOpenMovie: (movie: Movie) => void;
  language: Language;
}

const moods = [
  {
    icon: '🎭',
    title: 'Релакс та спокій',
    text: 'Повільне кіно для відпочинку',
  },
  {
    icon: '🍿',
    title: 'Адреналіновий драйв',
    text: 'Екшн на максимальній швидкості',
  },
  {
    icon: '🤯',
    title: 'Заплутаний сюжет',
    text: 'Історії, що кидають виклик',
  },
  {
    icon: '💔',
    title: 'Емоційний вибух',
    text: 'Коли хочеться прожити почуття',
  },
  {
    icon: '🌙',
    title: 'Нічний трилер',
    text: 'Напруга після заходу сонця',
  },
];

const benefits = [
  [
    '＋',
    'Створюй власні добірки',
    'Збирай кіно для будь-якого настрою',
  ],
  [
    '↻',
    'Синхронізуй улюблене',
    'Твій список завжди поруч',
  ],
  [
    '✦',
    'AI-рекомендації за настроєм',
    'Точніші поради з кожним вибором',
  ],
  [
    '☆',
    'Оцінюй та залишай відгуки',
    'Ділись враженнями зі спільнотою',
  ],
];

export default function HomePage(props: Props) {
  const ua = props.language === 'ua';

  const moodItems = ua
    ? moods
    : [
        {
          icon: '🎭',
          title: 'Chill & Relax',
          text: 'Slow cinema for unwinding',
        },
        {
          icon: '🍿',
          title: 'Adrenaline Rush',
          text: 'Action at maximum speed',
        },
        {
          icon: '🤯',
          title: 'Mind Bending',
          text: 'Stories that challenge you',
        },
        {
          icon: '💔',
          title: 'Emotional Release',
          text: 'When you need to feel it all',
        },
        {
          icon: '🌙',
          title: 'Late Night Thrills',
          text: 'Tension after sunset',
        },
      ];

  const benefitItems = ua
    ? benefits
    : [
        [
          '＋',
          'Create your collections',
          'Curate movies for every mood',
        ],
        [
          '↻',
          'Sync your favorites',
          'Your list is always with you',
        ],
        [
          '✦',
          'AI mood recommendations',
          'Smarter picks with every choice',
        ],
        [
          '☆',
          'Rate and review',
          'Share your thoughts with the community',
        ],
      ];

  const [mood, setMood] = useState(1);
  const featured = props.movies[3] ?? props.movies[0];
  const cards = props.movies.slice(0, 5);

  return (
    <main>
      <section className="hero section-wrap">
        <div
          className="hero__visual"
          style={{
            backgroundImage: `url(${featured?.trailerBg})`,
          }}
        >
          <div className="hero__overlay" />

          <div className="hero__content">
            <span className="eyebrow">
              <i />
              {ua
                ? 'ТВОЯ КІНОАТМОСФЕРА'
                : 'YOUR CINEMA ATMOSPHERE'}
            </span>

            <h1>
              {ua
                ? 'З поверненням, Саша!'
                : 'Welcome back, Sasha!'}
            </h1>

            <p>
              {ua
                ? 'Сьогодні саме той вечір, щоб загубитися у хорошій історії.'
                : 'Tonight is the perfect time to get lost in a great story.'}
            </p>

            <div className="hero__buttons">
              <button
                className="button button--primary"
                onClick={() =>
                  featured && props.onOpenMovie(featured)
                }
              >
                <span>▶</span>{' '}
                {ua
                  ? 'Продовжити трейлер'
                  : 'Continue trailer'}
              </button>

              <button
                className="button button--glass"
                onClick={props.onOpenCatalog}
              >
                {ua
                  ? 'Дивитися каталог'
                  : 'Browse catalog'}
              </button>
            </div>
          </div>

          <div className="hero__recommendation">
            <span>
              {ua
                ? 'РЕКОМЕНДАЦІЯ ДНЯ'
                : 'PICK OF THE DAY'}
            </span>

            <strong>
              {featured
                ? movieTitle(featured, props.language)
                : 'Неоновий лабіринт'}
            </strong>

            <p>
              {ua
                ? '98% відповідності настрою'
                : '98% mood match'}
            </p>
          </div>
        </div>
      </section>

      <section className="section-wrap section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {ua
                ? 'ОБЕРИ СВІЙ ВАЙБ'
                : 'CHOOSE YOUR VIBE'}
            </span>

            <h2>
              {ua
                ? 'Який у тебе сьогодні настрій?'
                : 'What is your mood today?'}
            </h2>
          </div>

          <div className="slider-controls">
            <button aria-label={ua ? 'Назад' : 'Previous'}>
              ←
            </button>
            <button aria-label={ua ? 'Далі' : 'Next'}>
              →
            </button>
          </div>
        </div>

        <div className="mood-row">
          {moodItems.map((item, index) => (
            <button
              className={`mood-card ${
                mood === index ? 'mood-card--active' : ''
              }`}
              onClick={() => setMood(index)}
              aria-pressed={mood === index}
              key={item.title}
            >
              <span className="mood-card__icon">
                {item.icon}
              </span>

              <strong>{item.title}</strong>
              <small>{item.text}</small>

              <i>
                {ua ? 'Обрати настрій' : 'Choose mood'} →
              </i>
            </button>
          ))}
        </div>
      </section>

      <section className="section-wrap section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {ua
                ? 'ЗАРАЗ ДИВЛЯТЬСЯ'
                : 'TRENDING NOW'}
            </span>

            <h2>
              {ua
                ? 'Популярне у спільноті'
                : 'Popular in the community'}
            </h2>
          </div>

          <button
            className="text-button"
            onClick={props.onOpenCatalog}
          >
            {ua ? 'Увесь каталог' : 'Full catalog'}
            <span>→</span>
          </button>
        </div>

        <div className="movie-grid movie-grid--five">
          {cards.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={props.favoriteIds.includes(movie.id)}
              isWatchlisted={props.watchlistIds.includes(
                movie.id,
              )}
              onFavorite={props.onFavorite}
              onWatchlist={props.onWatchlist}
              onOpenMovie={props.onOpenMovie}
              language={props.language}
              compact
            />
          ))}
        </div>
      </section>

      <section className="section-wrap section">
        <div className="benefits">
          <div className="benefits__intro">
            <span className="eyebrow">
              {ua
                ? 'БІЛЬШЕ З MOVIEMOOD'
                : 'MORE WITH MOVIEMOOD'}
            </span>

            <h2>
              {ua
                ? 'Твій особистий кінопростір'
                : 'Your personal cinema space'}
            </h2>

            <p>
              {ua
                ? 'Зберігай історії, які відгукнулися, та отримуй рекомендації, створені саме для тебе.'
                : 'Save stories that resonate and get recommendations made just for you.'}
            </p>
          </div>

          <div className="benefits__grid">
            {benefitItems.map(([icon, title, text]) => (
              <article className="benefit-card" key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
