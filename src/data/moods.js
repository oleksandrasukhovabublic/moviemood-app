// Картки настрою на головній. key — настрій, за яким сервер підбирає рекомендації
export const homeMoods = {
  ua: [
    { key: 'cozy', icon: '◌', title: 'Релакс та спокій', text: 'Повільне кіно для відпочинку' },
    {
      key: 'thrilling',
      icon: '△',
      title: 'Адреналіновий драйв',
      text: 'Екшн на максимальній швидкості',
    },
    {
      key: 'mind-bending',
      icon: '◇',
      title: 'Заплутаний сюжет',
      text: 'Історії, що кидають виклик',
    },
    { key: 'happy', icon: '♡', title: 'Емоційний вибух', text: 'Коли хочеться прожити почуття' },
    { key: 'thrilling', icon: '☾', title: 'Нічний трилер', text: 'Напруга після заходу сонця' },
  ],
  en: [
    { key: 'cozy', icon: '◌', title: 'Chill & Relax', text: 'Slow cinema for unwinding' },
    { key: 'thrilling', icon: '△', title: 'Adrenaline Rush', text: 'Action at maximum speed' },
    { key: 'mind-bending', icon: '◇', title: 'Mind Bending', text: 'Stories that challenge you' },
    { key: 'happy', icon: '♡', title: 'Emotional Release', text: 'When you need to feel it all' },
    { key: 'thrilling', icon: '☾', title: 'Late Night Thrills', text: 'Tension after sunset' },
  ],
};

// Фільтр настрою в каталозі
export const catalogMoods = ['all', 'cozy', 'thrilling', 'happy'];

export const catalogMoodLabels = {
  ua: { all: 'Усі настрої', cozy: 'Релакс', thrilling: 'Драйв', happy: 'Легкий' },
  en: { all: 'All moods', cozy: 'Chill', thrilling: 'Adrenaline', happy: 'Feel good' },
};
