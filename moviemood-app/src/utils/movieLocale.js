const uaTitles = {
  1: 'Паралельні життя',
  2: 'Протокол «Шторм»',
  3: 'Сонячні години',
  4: 'Неоновий лабіринт',
  5: 'Літнє цвітіння',
  6: 'Розколоте небо',
  7: 'Останній картограф',
  8: 'Кінетика',
  9: 'Золота година',
  10: 'Опівнічна частота',
};

const uaGenres = {
  Drama: 'Драма',
  Romance: 'Романтика',
  Thriller: 'Трилер',
  Action: 'Екшн',
  Comedy: 'Комедія',
  'Sci-Fi': 'Фантастика',
  Mystery: 'Детектив',
  Adventure: 'Пригоди',
  Crime: 'Кримінал',
};

export function movieTitle(movie, language = 'ua') {
  return language === 'ua' ? (uaTitles[movie.id] ?? movie.title) : movie.title;
}

export function genreLabel(genre, language = 'ua') {
  return language === 'ua' ? (uaGenres[genre] ?? genre) : genre;
}
