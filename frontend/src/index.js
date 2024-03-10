import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ConvosContextProvider } from './context/ConvosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConvosContextProvider>
        <App />
      </ConvosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


