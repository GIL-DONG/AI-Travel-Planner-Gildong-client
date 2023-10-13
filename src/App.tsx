import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Chat from '@/pages/Chat';
import { ROUTE_PATHS } from '@/constants/config';
import Auth from '@/pages/Auth';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { isLoginState } from './store/atom/userAtom';
import MyPage from './pages/MyPage';
import Modify from './pages/MyPage/Modify';
import Itineraries from './pages/Itineraries';
import Itinerary from './pages/Itineraries/Itinerary';

function App() {
  const isLogin = useRecoilValue(isLoginState);

  return (
    <>
      <main className="mainLayout">
        <Routes>
          <Route path={ROUTE_PATHS.home} element={<Chat home={true} />} />
          <Route
            path={ROUTE_PATHS.signIn}
            element={isLogin ? <Home /> : <SignIn />}
          />
          <Route
            path={ROUTE_PATHS.auth}
            element={isLogin ? <Home /> : <Auth />}
          />
          <Route
            path={ROUTE_PATHS.signUp}
            element={isLogin ? <Home /> : <SignUp />}
          />
          <Route path={ROUTE_PATHS.chat} element={<Chat />} />
          <Route path={ROUTE_PATHS.detail} element={<Detail />} />
          <Route
            path={ROUTE_PATHS.itinerary}
            element={isLogin ? <Itineraries /> : <SignIn />}
          />
          <Route path={ROUTE_PATHS.itineraryDetail} element={<Itinerary />} />
          <Route
            path={ROUTE_PATHS.myPage}
            element={isLogin ? <MyPage /> : <SignIn />}
          />
          <Route
            path={ROUTE_PATHS.updateUserInfo}
            element={isLogin ? <Modify /> : <SignIn />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
