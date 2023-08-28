import axios from 'axios';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export default function Auth() {
  const code = new URL(window.location.href).searchParams.get('code');
  const redirect_uri = import.meta.env.VITE_APP_REDIRECT_URL;

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/kakao/user_info?code=${code}&redirect_uri=${redirect_uri}`,
      );
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      잠시만 기다려주세요 로그인중입니다!
    </div>
  );
}
