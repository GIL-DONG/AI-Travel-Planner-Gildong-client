import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { ROUTE_PATHS } from '@/constants/config';
import {
  isLoginState,
  userDisabilityStatusState,
  userDisabilityTypeState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import parseToken from './utils/parseToken';
import { nameState } from './store/atom/signUpAtom';
import { postRefreshTokenAPI } from './services/auth';
import AppRouter from './routes/Router';

function App() {
  const navigate = useNavigate();
  const setName = useSetRecoilState(nameState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const setUserDisabilityStatus = useSetRecoilState(userDisabilityStatusState);
  const setUserDisabilityType = useSetRecoilState(userDisabilityTypeState);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || '',
  );

  const refreshToken = async () => {
    const data = await postRefreshTokenAPI();
    if (data.message === 'successfully!') {
      setAccessToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
    } else {
      localStorage.clear();
      navigate(ROUTE_PATHS.signIn);
    }
  };

  useEffect(() => {
    let logoutTimer;
    if (accessToken) {
      const { user_name, user_image, disability_status, disability_type, exp } =
        parseToken(accessToken || '');
      setIsLogin(true);
      setName(user_name);
      setProfileImage(user_image);
      setUserDisabilityStatus(disability_status);
      if (disability_status) {
        setUserDisabilityType(disability_type);
      }
      const remainingTime = Math.floor(
        (new Date(exp * 1000).getTime() - new Date().getTime()) / (60 * 1000),
      );
      logoutTimer = setTimeout(
        () => {
          refreshToken();
        },
        remainingTime * 60 * 1000,
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken]);

  return (
    <div className="mainLayout">
      <AppRouter />
    </div>
  );
}

export default App;
