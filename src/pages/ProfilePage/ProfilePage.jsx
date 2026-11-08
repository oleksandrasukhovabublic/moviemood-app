import { useState } from 'react';
import CollectionsTab from '../../components/profile/CollectionsTab/CollectionsTab';
import FavoritesTab from '../../components/profile/FavoritesTab/FavoritesTab';
import GuestProfile from '../../components/profile/GuestProfile/GuestProfile';
import ProfileHeader from '../../components/profile/ProfileHeader/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs/ProfileTabs';
import WatchlistTab from '../../components/profile/WatchlistTab/WatchlistTab';
import styles from './ProfilePage.module.css';

export default function ProfilePage({
  movies,
  favoriteIds,
  watchlistIds,
  watchedIds,
  onFavorite,
  onWatchlist,
  onToggleWatched,
  onOpenMovie,
  language,
  profile,
  isAuthenticated,
  onEdit,
  onLogout,
  onAuth,
  collections,
  onCreateCollection,
  onDeleteCollection,
  onRemoveFromCollection,
}) {
  const [tab, setTab] = useState('favorites');
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // Гість профілю не бачить: пропонуємо увійти
  if (!isAuthenticated || !profile) {
    return (
      <main className={`${styles.root} section-wrap`}>
        <GuestProfile language={language} onAuth={onAuth} />
      </main>
    );
  }

  const changeTab = (nextTab) => {
    setTab(nextTab);
    setSelectedCollectionId(null);
  };

  const selectedCollection = collections.find(
    (collection) => collection.id === selectedCollectionId
  );

  const counts = {
    favorites: favoriteIds.length,
    watchlist: watchlistIds.length,
    collections: collections.length,
  };

  // Спільні пропси для всіх сіток фільмів
  const gridProps = {
    favoriteIds,
    watchlistIds,
    onFavorite,
    onWatchlist,
    onOpenMovie,
    language,
  };

  return (
    <main className={`${styles.root} section-wrap`}>
      <ProfileHeader
        profile={profile}
        stats={counts}
        language={language}
        onEdit={onEdit}
        onLogout={onLogout}
      />

      <ProfileTabs activeTab={tab} onChange={changeTab} counts={counts} language={language} />

      {tab === 'favorites' && (
        <FavoritesTab
          movies={movies.filter((movie) => favoriteIds.includes(movie.id))}
          {...gridProps}
        />
      )}

      {tab === 'watchlist' && (
        <WatchlistTab
          movies={movies.filter((movie) => watchlistIds.includes(movie.id))}
          watchedIds={watchedIds}
          onToggleWatched={onToggleWatched}
          {...gridProps}
        />
      )}

      {tab === 'collections' && (
        <CollectionsTab
          collections={collections}
          movies={movies}
          selectedCollection={selectedCollection}
          onSelectCollection={setSelectedCollectionId}
          onCreateCollection={onCreateCollection}
          onDeleteCollection={onDeleteCollection}
          onRemoveFromCollection={onRemoveFromCollection}
          {...gridProps}
        />
      )}
    </main>
  );
}
