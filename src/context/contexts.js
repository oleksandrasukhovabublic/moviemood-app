import { createContext } from 'react';

// Обʼєкти контекстів лежать окремо від компонентів-провайдерів,
// щоб файли провайдерів експортували лише компоненти (вимога react-refresh).
export const LanguageContext = createContext(null);
export const ToastContext = createContext(null);
export const AuthContext = createContext(null);
export const ModalContext = createContext(null);
export const MovieContext = createContext(null);
