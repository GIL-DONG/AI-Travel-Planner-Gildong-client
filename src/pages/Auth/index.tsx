import { useState, useCallback, useEffect } from 'react';
import Loading from '@/components/common/Loading';
import { getUserInfoAPI, postKakaoAPI } from '@/services/auth';
import styles from './styles.module.scss';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const token = await postKakaoAPI(code);
        const data = await getUserInfoAPI(token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {isLoading ? <Loading /> : <>fdsd</>}
    </div>
  );
}
