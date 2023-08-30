import gildong from '@assets/gildong_3d_bg.png';
import kakao from '@assets/kakao.png';
import { REDIRECT_URL, REST_API_KEY } from '@constants/auth';
import styles from './styles.module.scss';

export default function SignIn() {
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  const handleSignIn = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <title className={styles.titleWrapper}>
          <div className={styles.text}>대화로 만들어가는 여행플래너</div>
          <div className={styles.title}>AI Travel Planner 길동이</div>
        </title>
        <img src={gildong} className={styles.img} />
        <button className={styles.btnWrapper} onClick={handleSignIn}>
          <div className={styles.btn}>
            <img src={kakao} />
            <span>카카오 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
}
