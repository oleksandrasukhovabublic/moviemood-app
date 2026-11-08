export function sortMovies(movies, sort) {
  return [...movies].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'year') return b.year - a.year;
    return b.id - a.id;
  });
}
