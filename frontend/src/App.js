import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import Logo from './components/logo';
import Login from "./pages/login";
import Messaging from "./pages/messaging";
import Register from "./pages/register";

function App() {
  const { user } = useAuthContext()
  console.log('user: ', user);

  return (
      <Router>
          <Logo />
          <Routes>
              <Route path="/" element={!user ? <Login /> : <Navigate to='/messaging' /> } /> 
              <Route path="/messaging" element={user ? <Messaging /> : <Navigate to='/' /> } /> 
              <Route path="/register" element={!user ? <Register /> : <Navigate to='/messaging' />} /> 
          </Routes>
      </Router>
  );
}

export default App;
