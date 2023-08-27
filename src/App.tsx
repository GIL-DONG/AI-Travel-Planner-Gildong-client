import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  return (
    <main className="mainLayout">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
