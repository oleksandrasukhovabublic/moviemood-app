import styles from './ProfileTabs.module.css';

// counts = { favorites, watchlist, collections }
export default function ProfileTabs({ activeTab, onChange, counts, language }) {
  const ua = language === 'ua';

  const tabs = [
    { id: 'favorites', label: ua ? '♥ Улюблені' : '♥ Favorites', count: counts.favorites },
    { id: 'watchlist', label: ua ? '★ Заплановані' : '★ Watchlist', count: counts.watchlist },
    { id: 'collections', label: ua ? '▣ Добірки' : '▣ Collections', count: counts.collections },
  ];

  return (
    <div className={styles.root} role="tablist">
      {tabs.map(({ id, label, count }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeTab === id}
          className={activeTab === id ? styles.active : ''}
          onClick={() => onChange(id)}
        >
          {label}
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
}
