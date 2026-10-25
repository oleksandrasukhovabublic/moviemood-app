import { movieTitle } from '../../../utils/movieLocale';
import styles from './HomeHero.module.css';

export default function HomeHero({ featured, language, onOpenMovie, onOpenCatalog }) {
  const ua = language === 'ua';

  return (
    <section className={`${styles.root} section-wrap`}>
      <div className={styles.visual} style={{ backgroundImage: `url(${featured?.trailerBg})` }}>
        <div className={styles.overlay} />

        <div className={styles.content}>
          <span className="eyebrow">
            <i />
            {ua ? 'ТВОЯ КІНОАТМОСФЕРА' : 'YOUR CINEMA ATMOSPHERE'}
          </span>

          <h1>{ua ? 'З поверненням, Саша!' : 'Welcome back, Sasha!'}</h1>

          <p>
            {ua
              ? 'Сьогодні саме той вечір, щоб загубитися у хорошій історії.'
              : 'Tonight is the perfect time to get lost in a great story.'}
          </p>

          <div className={styles.buttons}>
            <button
              className="button button--primary"
              onClick={() => {
                if (featured) {
                  onOpenMovie(featured);
                }
              }}
            >
              ▶ {ua ? 'Продовжити трейлер' : 'Continue trailer'}
            </button>

            <button className="button button--glass" onClick={onOpenCatalog}>
              {ua ? 'Дивитися каталог' : 'Browse catalog'}
            </button>
          </div>
        </div>

        <div className={styles.recommendation}>
          <span>{ua ? 'РЕКОМЕНДАЦІЯ ДНЯ' : 'PICK OF THE DAY'}</span>

          <strong>{featured ? movieTitle(featured, language) : 'MovieMood'}</strong>

          <p>{ua ? '98% відповідності настрою' : '98% mood match'}</p>
        </div>
      </div>
    </section>
  );
}
