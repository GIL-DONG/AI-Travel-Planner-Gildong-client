import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Loading from '@/components/common/Loading';
import { getUserInfoAPI, postKakaoAPI } from '@/services/auth';
import { idState, nameState } from '@/store/atom/signUpAtom';
import styles from './styles.module.scss';

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setName = useSetRecoilState(nameState);
  const setId = useSetRecoilState(idState);

  const getUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const token = await postKakaoAPI(code);
        const data = await getUserInfoAPI(token);
        sessionStorage.setItem('kakao_token', token);
        sessionStorage.setItem('id', data.data.id);
        setId(data.data.id);
        setName(data.data.properties.nickname);
        if (data.message === 'User not registered. Please sign up first.') {
          navigate('/signup');
        } else {
          navigate('/');
        }
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
    <div className={styles.pageWrapper}>{isLoading ? <Loading /> : <></>}</div>
  );
}
