import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';

export default function Error() {
  return (
    <main className={`mainLayout ${styles.container}`}>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <h2>데이터를 가져오지 못했습니다.</h2>
    </main>
  );
}
