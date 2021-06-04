import { useContext } from 'react';
import ToastContext from './ToastContext';

const useToastContext = () => {
  return useContext(ToastContext);
};

export default useToastContext;
