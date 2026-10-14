import { movieTitle } from '../../../utils/movieLocale';
import Modal from '../Modal/Modal';
import styles from './TrailerModal.module.css';

export default function TrailerModal({ movie, language, onClose }) {
  const ua = language === 'ua';

  return (
    <Modal
      size="bare"
      className={styles.dialog}
      onClose={onClose}
      closeLabel={ua ? 'Закрити' : 'Close'}
    >
      <div className={styles.preview} style={{ backgroundImage: `url(${movie.trailerBg})` }}>
        <span>▶</span>
      </div>

      <h2>{ua ? 'Офіційний трейлер' : 'Official trailer'}</h2>
      <p>{movieTitle(movie, language)}</p>
    </Modal>
  );
}
