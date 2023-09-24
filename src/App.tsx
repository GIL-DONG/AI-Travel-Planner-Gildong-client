import { Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/config';
import Auth from '@/pages/Auth';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <main className="mainLayout">
      <Routes>
        <Route path={ROUTE_PATHS.home} element={<Home />} />
        <Route path={ROUTE_PATHS.signIn} element={<SignIn />} />
        <Route path={ROUTE_PATHS.auth} element={<Auth />} />
        <Route path={ROUTE_PATHS.signUp} element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;
