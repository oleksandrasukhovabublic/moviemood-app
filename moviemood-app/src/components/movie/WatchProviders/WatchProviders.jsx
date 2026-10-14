import { streamingPlatforms } from '../../../data/streamingPlatforms';
import styles from './WatchProviders.module.css';

export default function WatchProviders({ streaming, language }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <div>
        <span className="eyebrow">{ua ? 'ДЕ ПЕРЕГЛЯНУТИ' : 'WHERE TO WATCH'}</span>

        <h2>{ua ? 'Доступно на платформах' : 'Available on platforms'}</h2>
      </div>

      <div className={styles.platforms}>
        {streamingPlatforms.slice(0, Math.max(1, streaming.length)).map(({ name, mark, style }) => (
          <article className={styles.platform} key={name}>
            <span className={`${styles.mark} ${styles[style]}`}>{mark}</span>

            <div>
              <strong>{name}</strong>
              <small>4K · {ua ? 'Підписка' : 'Subscription'}</small>
            </div>

            <button>{ua ? 'Дивитися зараз' : 'Watch now'} ↗</button>
          </article>
        ))}
      </div>
    </section>
  );
}
