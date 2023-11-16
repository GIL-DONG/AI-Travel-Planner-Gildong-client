import { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import { isLoginState } from '@/store/atom/userAtom';
import Loading from '@/components/common/Loading';
import { ROUTE_PATHS } from '@/constants/config';

export default function AppRouter() {
  const isLogin = useRecoilValue(isLoginState);

  const MainChatPage = lazy(() => import('@/pages/chat/MainChat'));
  const ItineraryChatPage = lazy(() => import('@/pages/chat/ItineraryChat'));
  const SignInPage = lazy(() => import('@/pages/user/SignIn'));
  const AuthPage = lazy(() => import('@/pages/user/Auth'));
  const SignUpPage = lazy(() => import('@/pages/user/SignUp'));
  const TravelDetailsPage = lazy(() => import('@/pages/travel/TravelDetails'));
  const ItineraryListPage = lazy(
    () => import('@/pages/travel/Itinerary/ItineraryList'),
  );
  const ItineraryDetailsPage = lazy(
    () => import('@/pages/travel/Itinerary/ItineraryDetails'),
  );
  const MyPage = lazy(() => import('@/pages/user/MyPage/Home'));
  const ModifyUserInfoPage = lazy(
    () => import('@/pages/user/MyPage/ModifyUserInfo'),
  );
  const ErrorPage = lazy(() => import('@/pages/error/NotFound'));

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
