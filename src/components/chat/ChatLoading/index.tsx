import loading from '@/assets/loading_chat.gif';
import styles from './styles.module.scss';

export default function ChatLoading() {
  return <img src={loading} className={styles.loading} />;
}
