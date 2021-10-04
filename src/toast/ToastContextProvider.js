import { useCallback, useEffect, useState } from 'react';
import ToastContext from './ToastContext';
import './styles.scss';
import Toast from './Toast';

export default function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (toast) => {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className='toasts-wrapper'>
        {toasts.map((toast) => (
          <Toast toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
