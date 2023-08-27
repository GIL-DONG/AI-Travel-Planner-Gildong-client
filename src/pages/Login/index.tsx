import gildong from '@assets/gildong_3d_bg.png';
import styles from './styles.module.scss';

export default function Login() {
  const Rest_api_key = import.meta.env.VITE_APP_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_APP_REDIRECT_URL;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <title className={styles.titleWrapper}>
          <div className={styles.text}>대화로 만들어가는 여행플래너</div>
          <div className={styles.title}>AI Travel Planner 길동이</div>
        </title>
        <img src={gildong} className={styles.img} />
        <button className={styles.btn} onClick={handleLogin} />
      </div>
    </div>
  );
}