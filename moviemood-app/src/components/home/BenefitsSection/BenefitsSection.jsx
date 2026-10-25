import styles from './BenefitsSection.module.css';

export default function BenefitsSection({ language }) {
  const ua = language === 'ua';

  const benefits = [
    { icon: '＋', title: ua ? 'Власні добірки' : 'Custom collections' },
    { icon: '↻', title: ua ? 'Синхронізація' : 'Sync favorites' },
    { icon: '✦', title: ua ? 'Mood-рекомендації' : 'Mood recommendations' },
    { icon: '☆', title: ua ? 'Оцінки та відгуки' : 'Ratings and reviews' },
  ];

  return (
    <section className="section-wrap section">
      <div className={styles.root}>
        <div>
          <span className="eyebrow">{ua ? 'БІЛЬШЕ З MOVIEMOOD' : 'MORE WITH MOVIEMOOD'}</span>

          <h2>{ua ? 'Твій особистий кінопростір' : 'Your personal cinema space'}</h2>

          <p>
            {ua
              ? 'Зберігай улюблені історії та отримуй добірки під свій настрій.'
              : 'Save favorite stories and discover collections for your mood.'}
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map(({ icon, title }) => (
            <article key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>
                {ua
                  ? 'Усе для твого ідеального кіновечора.'
                  : 'Everything for your perfect movie night.'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
