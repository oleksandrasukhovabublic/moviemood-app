import ProfileStats from '../ProfileStats/ProfileStats';
import Avatar from '../../common/Avatar/Avatar';
import styles from './ProfileHeader.module.css';

// stats = { favorites, watchlist, collections } — лічильники для блоку статистики
export default function ProfileHeader({ profile, stats, language, onEdit, onLogout }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <div className={styles.glow} />

      <div className={styles.person}>
        <Avatar src={profile.avatar} initials={profile.initials} status />

        <div>
          <small>{ua ? 'КІНОМАН' : 'CINEMANIAC'}</small>
          <h1>{profile.name}</h1>
          <p>
            {profile.handle} · {profile.bio}
          </p>
        </div>
      </div>

      <ProfileStats
        favorites={stats.favorites}
        watchlist={stats.watchlist}
        collections={stats.collections}
        language={language}
      />

      <div className={styles.actions}>
        <button className="button button--glass" onClick={onEdit}>
          {ua ? 'Редагувати' : 'Edit profile'}
        </button>

        <button onClick={onLogout}>{ua ? 'Вийти' : 'Log out'}</button>
      </div>
    </section>
  );
}
