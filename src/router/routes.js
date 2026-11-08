// Усі адреси сайту в одному місці: якщо адреса зміниться, правити треба лише тут.
export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  movie: '/movie/:movieId',
  profile: '/profile',
};

// Адреса сторінки конкретного фільму: moviePath(3) → '/movie/3'
export const moviePath = (id) => `/movie/${id}`;
