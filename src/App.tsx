import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Chat from '@/pages/Chat';
import { ROUTE_PATHS } from '@/constants/config';
import Auth from '@/pages/Auth';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import {
  isLoginState,
  userDisabilityStatusState,
  userDisabilityTypeState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import Detail from './pages/Detail';
import MyPage from './pages/MyPage';
import Modify from './pages/MyPage/Modify';
import Itineraries from './pages/Itineraries';
import Itinerary from './pages/Itineraries/Itinerary';
import ItineraryChat from './pages/Chat/ItineraryChat';
import Error from './pages/Error';
import parseToken from './utils/parseToken';
import { nameState } from './store/atom/signUpAtom';
import { postRefreshTokenAPI } from './services/auth';
import Test from './pages/Test';

function App() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginState);
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
    <>
      <main className="mainLayout">
        <Routes>
          <Route path={ROUTE_PATHS.home} element={<Chat home={true} />} />
          <Route
            path={ROUTE_PATHS.signIn}
            element={isLogin ? <Chat home={true} /> : <SignIn />}
          />
          <Route
            path={ROUTE_PATHS.auth}
            element={isLogin ? <Chat home={true} /> : <Auth />}
          />
          <Route
            path={ROUTE_PATHS.signUp}
            element={isLogin ? <Chat home={true} /> : <SignUp />}
          />
          <Route path={ROUTE_PATHS.chat} element={<Chat />} />
          <Route path={ROUTE_PATHS.detail} element={<Detail />} />
          <Route
            path={ROUTE_PATHS.itinerary}
            element={isLogin ? <Itineraries /> : <SignIn />}
          />
          <Route path={ROUTE_PATHS.itineraryDetail} element={<Itinerary />} />
          <Route path={ROUTE_PATHS.itineraryChat} element={<ItineraryChat />} />
          <Route
            path={ROUTE_PATHS.myPage}
            element={isLogin ? <MyPage /> : <SignIn />}
          />
          <Route
            path={ROUTE_PATHS.updateUserInfo}
            element={isLogin ? <Modify /> : <SignIn />}
          />
          <Route path={'/test'} element={<Test />} />
          <Route path={ROUTE_PATHS.error} element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
