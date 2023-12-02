import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { REDIRECT_URL, REST_API_KEY } from '@/constants/auth';
import { ROUTE_PATHS } from '@/constants/config';
import { getUserInfoAPI } from '@/services/auth';
import { pageState } from '@/store/atom/chatAtom';
import { idState, nickNameState } from '@/store/atom/signUpAtom';
import {
  isLoginState,
  kakaoTokenState,
  nameState,
  userDisabilityStatusState,
  userDisabilityTypeState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import parseToken from '@/utils/parseToken';

export default function useAuth() {
  const navigate = useNavigate();
  const page = useRecoilValue(pageState);
  const setNickName = useSetRecoilState(nickNameState);
  const setName = useSetRecoilState(nameState);
  const setId = useSetRecoilState(idState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const setKakaoToken = useSetRecoilState(kakaoTokenState);
  const setUserDisabilityStatus = useSetRecoilState(userDisabilityStatusState);
  const setUserDisabilityType = useSetRecoilState(userDisabilityTypeState);
  const setPage = useSetRecoilState(pageState);
  const [isLoading, setIsLoading] = useState(false);

  const getKakaoToken = async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      const response = await axios.post(
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
      return response;
    }
  };

  const getUserInfoByParseToken = (token: string) => {
    localStorage.setItem('access_token', token);
    const { user_name, user_image, disability_status, disability_type } =
      parseToken(token);
    setIsLogin(true);
    setName(user_name);
    setProfileImage(user_image);
    setUserDisabilityStatus(disability_status);
    if (disability_status) {
      setUserDisabilityType(disability_type);
    }
  };

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const data = await getKakaoToken();
      if (data?.data) {
        const token = data.data?.access_token;
        setKakaoToken(token);
        const response = await getUserInfoAPI(token);
        if (
          response?.data.message ===
          'User not registered. Please sign up first.'
        ) {
          setId(response?.data?.data.id);
          setNickName(response?.data?.data.properties?.nickname);
          if (!response?.data?.data.kakao_account?.profile.is_default_image) {
            setProfileImage(response?.data?.data.properties?.profile_image);
          } else if (
            response?.data?.data.kakao_account?.profile.is_default_image
          ) {
            setProfileImage('default');
          }
          navigate(ROUTE_PATHS.signUp);
        } else if (response?.data?.message === 'Logged in successfully') {
          getUserInfoByParseToken(response?.data?.data.access_token);
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
  };

  return { isLoading, getUserInfo, getUserInfoByParseToken };
}
