export function filterMovies(movies, { mood, genre, year, rating }) {
  return movies
    .filter((movie) => movie.year >= year && movie.rating >= rating)
    .filter((movie) => genre === 'all' || movie.genres.includes(genre))
    .filter((movie) => mood === 'all' || movie.moods.includes(mood));
}
