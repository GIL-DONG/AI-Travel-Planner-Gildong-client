import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gildong from '@/assets/gildong.webp';
import kakao from '@/assets/kakao.webp';
import { JAVASCRIPT_KEY, REDIRECT_URL } from '@/constants/auth';
import useStatus from '@/hooks/useStatus';
import styles from './styles.module.scss';

export default function SignIn() {
  useStatus('signIn', '');

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
    <main className={styles.pageWrapper}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <img src={gildong} className={styles.img} alt="길동이이미지" />
          <h2 className={styles.description}>대화로 만들어가는 여행 플래너</h2>
          <h1 className={styles.text}>AI Travel Planner</h1>
          <h1 className={styles.title}>길동이</h1>
        </div>
        <button
          className={styles.btn}
          onClick={loginWithKakao}
          aria-label="카카오 로그인"
        >
          <img src={kakao} alt="카카오로고이미지" />
          카카오 로그인
        </button>
      </section>
    </main>
  );
}
