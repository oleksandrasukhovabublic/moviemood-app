// Картки настрою на головній
export const homeMoods = {
  ua: [
    { icon: '◌', title: 'Релакс та спокій', text: 'Повільне кіно для відпочинку' },
    { icon: '△', title: 'Адреналіновий драйв', text: 'Екшн на максимальній швидкості' },
    { icon: '◇', title: 'Заплутаний сюжет', text: 'Історії, що кидають виклик' },
    { icon: '♡', title: 'Емоційний вибух', text: 'Коли хочеться прожити почуття' },
    { icon: '☾', title: 'Нічний трилер', text: 'Напруга після заходу сонця' },
  ],
  en: [
    { icon: '◌', title: 'Chill & Relax', text: 'Slow cinema for unwinding' },
    { icon: '△', title: 'Adrenaline Rush', text: 'Action at maximum speed' },
    { icon: '◇', title: 'Mind Bending', text: 'Stories that challenge you' },
    { icon: '♡', title: 'Emotional Release', text: 'When you need to feel it all' },
    { icon: '☾', title: 'Late Night Thrills', text: 'Tension after sunset' },
  ],
};

// Фільтр настрою в каталозі
export const catalogMoods = ['all', 'cozy', 'thrilling', 'happy'];

export const catalogMoodLabels = {
  ua: { all: 'Усі настрої', cozy: 'Релакс', thrilling: 'Драйв', happy: 'Легкий' },
  en: { all: 'All moods', cozy: 'Chill', thrilling: 'Adrenaline', happy: 'Feel good' },
};
