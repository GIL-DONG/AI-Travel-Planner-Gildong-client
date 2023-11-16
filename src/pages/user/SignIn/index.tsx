import { useEffect } from 'react';
import gildong from '@/assets/gildong_3d_bg.png';
import kakao from '@/assets/kakao.png';
import { JAVASCRIPT_KEY, REDIRECT_URL } from '@/constants/auth';
import useStatus from '@/hooks/useStatus';
import styles from './styles.module.scss';

export default function SignIn() {
  useStatus('signIn', 'AI Travel Planner 길동이');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js';
    script.integrity =
      'sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => {
      window.Kakao.init(JAVASCRIPT_KEY);
    };
    document.body.appendChild(script);
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
      scope: 'talk_calendar,profile_nickname,profile_image',
    }).then((error: any) => console.log(error.json()));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <title className={styles.titleWrapper}>
          <div className={styles.text}>대화로 만들어가는 여행플래너</div>
          <div className={styles.title}>AI Travel Planner 길동이</div>
        </title>
        <img src={gildong} className={styles.img} />
        <button className={styles.btnWrapper} onClick={loginWithKakao}>
          <div className={styles.btn}>
            <img src={kakao} />
            <span>카카오 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
}
