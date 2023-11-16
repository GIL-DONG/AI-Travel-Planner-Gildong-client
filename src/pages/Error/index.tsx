import { useNavigate } from 'react-router-dom';
import gildong from '@/assets/gildong_3d_bg.png';
import Button from '@/components/Common/Button';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function Error() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>4</span>
            <img src={gildong} className={styles.img} />
            <span className={styles.title}>4</span>
          </div>
          <span className={styles.text}>
            요청하신 페이지를 찾을 수 없습니다.
          </span>
          <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.home)}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </>
  );
}
