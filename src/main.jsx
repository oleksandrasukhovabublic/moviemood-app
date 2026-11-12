import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ModalProvider } from './context/ModalContext';
import { MovieProvider } from './context/MovieContext';
import { ToastProvider } from './context/ToastContext';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

// Порядок провайдерів важливий: кожен наступний користується попередніми
// (мова → повідомлення → авторизація → модальні вікна → фільми та списки).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <ModalProvider>
              <MovieProvider>
                <App />
              </MovieProvider>
            </ModalProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
