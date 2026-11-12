import { api } from './api';

// Списки користувача: favorites (улюблені), watchlist (заплановані), watched (переглянуті)
export const profileService = {
  getList: (listName, options) => api.get(`/${listName}`, options),
  addToList: (listName, movieId) => api.post(`/${listName}/${movieId}`),
  removeFromList: (listName, movieId) => api.delete(`/${listName}/${movieId}`),
};
