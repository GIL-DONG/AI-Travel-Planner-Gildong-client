import Auth from '@pages/Auth';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main className="mainLayout">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default App;
