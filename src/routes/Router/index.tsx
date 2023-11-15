import { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import { isLoginState } from '@/store/atom/userAtom';
import Loading from '@/components/Common/Loading';
import { ROUTE_PATHS } from '@/constants/config';

export default function AppRouter() {
  const isLogin = useRecoilValue(isLoginState);

  const ChatPage = lazy(() => import('@/pages/Chat'));
  const SignInPage = lazy(() => import('@/pages/SignIn'));
  const AuthPage = lazy(() => import('@/pages/Auth'));
  const SignUpPage = lazy(() => import('@/pages/SignUp'));
  const DetailPage = lazy(() => import('@/pages/Detail'));
  const ItinerariesPage = lazy(() => import('@/pages/Itineraries'));
  const ItineraryPage = lazy(() => import('@/pages/Itineraries/Itinerary'));
  const ItineraryChatPage = lazy(() => import('@/pages/Chat/ItineraryChat'));
  const MyPage = lazy(() => import('@/pages/MyPage'));
  const ModifyPage = lazy(() => import('@/pages/MyPage/Modify'));
  const ErrorPage = lazy(() => import('@/pages/Error'));
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTE_PATHS.home} element={<ChatPage home={true} />} />
        <Route
          path={ROUTE_PATHS.signIn}
          element={isLogin ? <ChatPage home={true} /> : <SignInPage />}
        />
        <Route
          path={ROUTE_PATHS.auth}
          element={isLogin ? <ChatPage home={true} /> : <AuthPage />}
        />
        <Route
          path={ROUTE_PATHS.signUp}
          element={isLogin ? <ChatPage home={true} /> : <SignUpPage />}
        />
        <Route path={ROUTE_PATHS.chat} element={<ChatPage />} />
        <Route path={ROUTE_PATHS.detail} element={<DetailPage />} />
        <Route
          path={ROUTE_PATHS.itinerary}
          element={isLogin ? <ItinerariesPage /> : <SignInPage />}
        />
        <Route path={ROUTE_PATHS.itineraryDetail} element={<ItineraryPage />} />
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
          element={isLogin ? <ModifyPage /> : <SignInPage />}
        />
        <Route path={ROUTE_PATHS.error} element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
