import Header from '@/components/common/Header';
import styles from './styles.module.scss';
export default function Home() {
  return (
    <div className={`${styles.pageWrapper} colorLayout`}>
      <Header />
    </div>
  );
}
