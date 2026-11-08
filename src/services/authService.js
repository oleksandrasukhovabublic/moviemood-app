import { api } from './api';

// Усі запити авторизації. Відповідь входу/реєстрації: { token, user }
export const authService = {
  register: ({ name, email, password }) => api.post('/auth/register', { name, email, password }),
  login: ({ email, password }) => api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: (options) => api.get('/auth/me', options),
};
