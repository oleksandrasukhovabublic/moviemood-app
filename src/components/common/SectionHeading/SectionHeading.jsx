import styles from './SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className={styles.root}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>

      {action}
    </div>
  );
}
