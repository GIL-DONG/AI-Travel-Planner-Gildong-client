import LoadingSpinner from '../LoadingSpinner';
import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={`mainLayout ${styles.container}`}>
      <LoadingSpinner />
    </div>
  );
}
