import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ConvosContextProvider } from './context/ConvosContext';
import { MessageContextProvider } from './context/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConvosContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </ConvosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


