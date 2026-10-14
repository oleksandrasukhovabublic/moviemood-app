import { getLocalizedTitle } from '../../../utils/getLocalizedTitle';
import SectionHeading from '../../common/SectionHeading/SectionHeading';
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
  language,
  ...gridProps
}) {
  const ua = language === 'ua';

  if (selectedCollection) {
    return (
      <ProfileContent>
        <button
          className="button button--glass"
          style={{ marginBottom: '20px', cursor: 'pointer' }}
          onClick={() => onSelectCollection(null)}
        >
          ← {ua ? 'Назад до добірок' : 'Back to collections'}
        </button>

        <SectionHeading
          eyebrow={ua ? 'ДОБІРКА' : 'COLLECTION'}
          title={getLocalizedTitle(selectedCollection.title, language)}
        />

        <MovieGrid
          movies={movies.filter((movie) => selectedCollection.ids.includes(movie.id))}
          language={language}
          {...gridProps}
        />
      </ProfileContent>
    );
  }

  return (
    <ProfileContent>
      <SectionHeading
        eyebrow={ua ? 'ВЛАСНА АТМОСФЕРА' : 'YOUR ATMOSPHERE'}
        title={ua ? 'Мої добірки' : 'My collections'}
        action={
          <button className="button button--primary">
            ＋ {ua ? 'Нова добірка' : 'New collection'}
          </button>
        }
      />

      <div className={styles.grid}>
        {collections.map((collection) => {
          const id = collection.id || getLocalizedTitle(collection.title, language);

          return (
            <CollectionCard
              key={id}
              collection={collection}
              movies={movies}
              language={language}
              onSelect={() => onSelectCollection(id)}
            />
          );
        })}
      </div>
    </ProfileContent>
  );
}
