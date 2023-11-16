import { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import { isLoginState } from '@/store/atom/userAtom';
import Loading from '@/components/Common/Loading';
import { ROUTE_PATHS } from '@/constants/config';

export default function AppRouter() {
  const isLogin = useRecoilValue(isLoginState);

  const MainChatPage = lazy(() => import('@/pages/Chat/MainChat'));
  const ItineraryChatPage = lazy(() => import('@/pages/Chat/ItineraryChat'));
  const SignInPage = lazy(() => import('@/pages/User/SignIn'));
  const AuthPage = lazy(() => import('@/pages/User/Auth'));
  const SignUpPage = lazy(() => import('@/pages/User/SignUp'));
  const TravelDetailsPage = lazy(() => import('@/pages/Travel/TravelDetails'));
  const ItineraryListPage = lazy(
    () => import('@/pages/Travel/Itinerary/ItineraryList'),
  );
  const ItineraryDetailsPage = lazy(
    () => import('@/pages/Travel/Itinerary/ItineraryDetails'),
  );
  const MyPage = lazy(() => import('@/pages/User/MyPage/Home'));
  const ModifyUserInfoPage = lazy(
    () => import('@/pages/User/MyPage/ModifyUserInfo'),
  );
  const ErrorPage = lazy(() => import('@/pages/Error'));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTE_PATHS.home} element={<MainChatPage home={true} />} />
        <Route
          path={ROUTE_PATHS.signIn}
          element={isLogin ? <MainChatPage home={true} /> : <SignInPage />}
        />
        <Route
          path={ROUTE_PATHS.auth}
          element={isLogin ? <MainChatPage home={true} /> : <AuthPage />}
        />
        <Route
          path={ROUTE_PATHS.signUp}
          element={isLogin ? <MainChatPage home={true} /> : <SignUpPage />}
        />
        <Route path={ROUTE_PATHS.chat} element={<MainChatPage />} />
        <Route path={ROUTE_PATHS.detail} element={<TravelDetailsPage />} />
        <Route
          path={ROUTE_PATHS.itinerary}
          element={isLogin ? <ItineraryListPage /> : <SignInPage />}
        />
        <Route
          path={ROUTE_PATHS.itineraryDetail}
          element={<ItineraryDetailsPage />}
        />
        <Route
          path={ROUTE_PATHS.itineraryChat}
          element={<ItineraryChatPage />}
        />
        <Route
          path={ROUTE_PATHS.myPage}
          element={isLogin ? <MyPage /> : <SignInPage />}
        />
        <Route
          path={ROUTE_PATHS.updateUserInfo}
          element={isLogin ? <ModifyUserInfoPage /> : <SignInPage />}
        />
        <Route path={ROUTE_PATHS.error} element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
