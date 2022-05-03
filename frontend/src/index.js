import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import AuthContextProvider from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider >
      <App />
    </AuthContextProvider >
  </React.StrictMode>,
  document.getElementById('root')
);

