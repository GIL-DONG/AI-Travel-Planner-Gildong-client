import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gildong from '@/assets/gildong.webp';
import Button from '@/components/common/Button';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.pageWrapper}>
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>4</span>
          <img src={gildong} className={styles.img} alt="길동이이미지" />
          <span className={styles.title}>4</span>
        </div>
        <span className={styles.text}>요청하신 페이지를 찾을 수 없습니다.</span>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTE_PATHS.home)}
          label="홈으로돌아가기"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </main>
  );
}
