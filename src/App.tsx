import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ROUTE_PATHS } from '@/constants/config';
import Auth from '@/pages/Auth';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

function App() {
  return (
    <RecoilRoot>
      <main className="mainLayout">
        <Routes>
          <Route path={ROUTE_PATHS.signIn} element={<SignIn />} />
          <Route path={ROUTE_PATHS.auth} element={<Auth />} />
          <Route path={ROUTE_PATHS.signUp} element={<SignUp />} />
        </Routes>
      </main>
    </RecoilRoot>
  );
}

export default App;
