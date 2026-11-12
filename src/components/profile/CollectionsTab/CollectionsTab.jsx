import { useState } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import EmptyState from '../../common/EmptyState/EmptyState';
import SectionHeading from '../../common/SectionHeading/SectionHeading';
import CreateCollectionModal from '../../modals/CreateCollectionModal/CreateCollectionModal';
import MovieGrid from '../../movie/MovieGrid/MovieGrid';
import CollectionCard from '../CollectionCard/CollectionCard';
import ProfileContent from '../ProfileContent/ProfileContent';
import styles from './CollectionsTab.module.css';

// Дві стадії: список добірок або відкрита добірка (selectedCollection).
// onSelectCollection(id) відкриває добірку, onSelectCollection(null) повертає до списку.
export default function CollectionsTab({
  collections,
  movies,
  selectedCollection,
  onSelectCollection,
  onCreateCollection,
  onDeleteCollection,
  onRemoveFromCollection,
  language,
  ...gridProps
}) {
  const { t } = useLanguage();
  const [createOpen, setCreateOpen] = useState(false);
  const ua = language === 'ua';

  if (selectedCollection) {
    const title = getLocalizedTitle(selectedCollection.title, language);
    const collectionMovies = movies.filter((movie) => selectedCollection.ids.includes(movie.id));

    const handleDelete = async () => {
      if (!window.confirm(t('collections.deleteConfirm', { title }))) return;
      const deleted = await onDeleteCollection(selectedCollection);
      if (deleted) onSelectCollection(null);
    };

    return (
      <ProfileContent>
        <div className={styles.toolbar}>
          <button className="button button--glass" onClick={() => onSelectCollection(null)}>
            ← {ua ? 'Назад до добірок' : 'Back to collections'}
          </button>

          <button className={styles.danger} onClick={handleDelete}>
            {t('common.delete')}
          </button>
        </div>

        <SectionHeading eyebrow={ua ? 'ДОБІРКА' : 'COLLECTION'} title={title} />

        {collectionMovies.length ? (
          <MovieGrid
            movies={collectionMovies}
            language={language}
            {...gridProps}
            renderExtra={(movie) => (
              <button
                className={styles.removeMovie}
                onClick={() => onRemoveFromCollection(selectedCollection.id, movie)}
              >
                × {t('common.remove')}
              </button>
            )}
          />
        ) : (
          <EmptyState title={t('collections.emptyCollection')} text="" />
        )}
      </ProfileContent>
    );
  }

  return (
    <ProfileContent>
      <SectionHeading
        eyebrow={ua ? 'ВЛАСНА АТМОСФЕРА' : 'YOUR ATMOSPHERE'}
        title={ua ? 'Мої добірки' : 'My collections'}
        action={
          <button className="button button--primary" onClick={() => setCreateOpen(true)}>
            ＋ {t('collections.create')}
          </button>
        }
      />

      {collections.length ? (
        <div className={styles.grid}>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              movies={movies}
              language={language}
              onSelect={() => onSelectCollection(collection.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState title={t('collections.empty')} text={t('collections.emptyText')} />
      )}

      {createOpen && (
        <CreateCollectionModal onCreate={onCreateCollection} onClose={() => setCreateOpen(false)} />
      )}
    </ProfileContent>
  );
}
