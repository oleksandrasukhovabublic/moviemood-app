import { useContext } from 'react';
import { AuthContext } from '../context/contexts';

// Авторизація: { user, isAuthenticated, isLoading, login, register, logout, updateUser }
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth потрібно викликати всередині <AuthProvider>');
  return value;
}
