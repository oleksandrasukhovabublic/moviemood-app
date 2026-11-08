import { api } from './api';

// Добірки фільмів поточного користувача
export const collectionService = {
  getAll: (options) => api.get('/collections', options),
  create: (title) => api.post('/collections', { title }),
  remove: (collectionId) => api.delete(`/collections/${collectionId}`),
  addMovie: (collectionId, movieId) => api.post(`/collections/${collectionId}/movies`, { movieId }),
  removeMovie: (collectionId, movieId) =>
    api.delete(`/collections/${collectionId}/movies/${movieId}`),
};
