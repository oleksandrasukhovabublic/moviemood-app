import { castPhotos } from '../../../data/cast';
import SectionHeading from '../../common/SectionHeading/SectionHeading';
import CastCard from '../CastCard/CastCard';
import styles from './CastGrid.module.css';

export default function CastGrid({ cast, language }) {
  const ua = language === 'ua';

  return (
    <section className={styles.root}>
      <SectionHeading
        eyebrow={ua ? 'У ГОЛОВНИХ РОЛЯХ' : 'STARRING'}
        title={ua ? 'Акторський склад' : 'Cast'}
      />

      <div className={styles.grid}>
        {cast.map((actor, index) => (
          <CastCard
            key={actor}
            name={actor}
            photo={castPhotos[index % castPhotos.length]}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}
