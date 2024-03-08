import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Logo from './components/Logo';
import Login from "./pages/login";
import Messaging from "./pages/messaging";
import Register from "./pages/register";

function App() {
  return (
      <Router>
          <Logo />
          <Routes>
              <Route path="/" element={<Login />} /> 
              <Route path="/messaging" element={<Messaging />} /> 
              <Route path="/register" element={<Register />} /> 
          </Routes>
      </Router>
  );
}

export default App;
