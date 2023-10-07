import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Loading from '@/components/Common/LoadingSpinner';
import { getUserInfoAPI, postKakaoAPI } from '@/services/auth';
import { idState, nameState } from '@/store/atom/signUpAtom';
import { isLoginState, profileImageState } from '@/store/atom/userAtom';
import parseToken from '@/utils/parseToken';
import styles from './styles.module.scss';

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setName = useSetRecoilState(nameState);
  const setId = useSetRecoilState(idState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfileImage = useSetRecoilState(profileImageState);

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
          sessionStorage.setItem('name', data.data.properties.nickname);
          if (!data.data.kakao_account.profile.is_default_image) {
            sessionStorage.setItem(
              'profile_image',
              data.data.properties.profile_image,
            );
            setProfileImage(data.data.properties.profile_image);
          }
          setId(data.data.id);
          setName(data.data.properties.nickname);
          navigate('/signup');
        } else {
          localStorage.setItem('access_token', data.data.access_token);
          const { user_name, user_image } = parseToken(data.data.access_token);
          sessionStorage.setItem('name', user_name);
          sessionStorage.setItem('profile_image', user_image);
          setName(user_name);
          setProfileImage(user_image);
          setIsLogin(true);
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
