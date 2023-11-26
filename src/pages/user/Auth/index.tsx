import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { getUserInfoAPI } from '@/services/auth';
import { idState, nameState } from '@/store/atom/signUpAtom';
import {
  isLoginState,
  kakaoTokenState,
  userDisabilityStatusState,
  userDisabilityTypeState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import parseToken from '@/utils/parseToken';
import { ROUTE_PATHS } from '@/constants/config';
import { pageState } from '@/store/atom/chatAtom';
import { REDIRECT_URL, REST_API_KEY } from '@/constants/auth';
import Loading from '@/components/common/Loading';
import styles from './styles.module.scss';

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setName = useSetRecoilState(nameState);
  const setId = useSetRecoilState(idState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const setKakaoToken = useSetRecoilState(kakaoTokenState);
  const setUserDisabilityStatus = useSetRecoilState(userDisabilityStatusState);
  const setUserDisabilityType = useSetRecoilState(userDisabilityTypeState);
  const page = useRecoilValue(pageState);
  const setPage = useSetRecoilState(pageState);

  const getUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const data = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URL,
            code: code,
          },
          {
            headers: { 'Content-Type': `application/x-www-form-urlencoded` },
          },
        );
        const token = data.data?.access_token;
        const response = await getUserInfoAPI(token);
        setKakaoToken(token);
        if (
          response?.data.message ===
          'User not registered. Please sign up first.'
        ) {
          setId(response?.data?.data.id);
          setName(response?.data?.data.properties?.nickname);
          if (!response?.data?.data.kakao_account?.profile.is_default_image) {
            setProfileImage(response?.data?.data.properties?.profile_image);
          } else if (
            response?.data?.data.kakao_account?.profile.is_default_image
          ) {
            setProfileImage('default');
          }
          navigate(ROUTE_PATHS.signUp);
        } else if (response?.data?.message === 'Logged in successfully') {
          localStorage.setItem(
            'access_token',
            response?.data?.data.access_token,
          );
          const { user_name, user_image, disability_status, disability_type } =
            parseToken(response?.data?.data.access_token);
          setIsLogin(true);
          setName(user_name);
          setProfileImage(user_image);
          setUserDisabilityStatus(disability_status);
          if (disability_status) {
            setUserDisabilityType(disability_type);
          }
          if (page) {
            navigate(page);
            setPage('');
          } else {
            navigate(ROUTE_PATHS.home);
          }
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
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      {isLoading && <Loading />}
    </div>
  );
}
