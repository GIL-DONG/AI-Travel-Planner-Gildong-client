import loading from '@/assets/loading.gif';
import styles from './styles.module.scss';

export default function LoadingSpinner() {
  return <img src={loading} className={styles.img} alt="로딩이미지" />;
}
