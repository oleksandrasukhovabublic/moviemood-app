import styles from './CastCard.module.css';

export default function CastCard({ name, photo, language }) {
  const ua = language === 'ua';

  return (
    <article className={styles.root}>
      <img src={photo} alt={name} />

      <div>
        <strong>{name}</strong>
        <span>{ua ? 'Актор / акторка' : 'Actor'}</span>
      </div>
    </article>
  );
}
