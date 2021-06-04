import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ToastContextProvider from './toast/ToastContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
