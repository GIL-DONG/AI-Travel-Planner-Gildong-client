import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Loading from '@/components/Common/LoadingSpinner';
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
        if (data.message === 'User not registered. Please sign up first.') {
          sessionStorage.setItem('id', data.data.id);
          if (!data.data.kakao_account.profile.is_default_image)
            sessionStorage.setItem(
              'profile_image',
              data.data.properties.profile_image,
            );
          setId(data.data.id);
          setName(data.data.properties.nickname);
          navigate('/signup');
        } else {
          localStorage.setItem('access_token', data.data.access_token);
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
