import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Loading from '@/components/common/Loading';
import useAuth from '@/hooks/useAuth';
import styles from './styles.module.scss';

export default function Auth() {
  const { isLoading, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      {isLoading && <Loading />}
    </div>
  );
}
