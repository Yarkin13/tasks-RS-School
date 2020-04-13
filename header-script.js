const BURGER_BTN = document.getElementById('burger-checkbox');
const MODE = document.getElementById('mode');
const SPAN = document.querySelector('span');
const BURGER_MENU = document.querySelector('.burger-menu__menu');
const SWITCH_MODE = document.getElementById('switch-mode');
const SWITCH_MODE_LABEL = document.querySelector('.switch-mode__for');
const CARDS_CONTAINER = document.querySelector('.container-cards');
const CARD_LIST = document.querySelectorAll('.container-card__items');
const START_BTN = document.querySelector('.game-options-start');
const REPEAT_BTN = document.getElementById('repeat');
let stateNow = { // объект текущего состояния
  category: '',
  mode: 'train',
  currentCard: '',
};

BURGER_BTN.addEventListener('click', (event) => { // меню
  const target = event.target;
  if (target.tagName === 'SPAN' || target.tagName === 'INPUT') {
    if (SPAN.classList.contains('burger-menu_active')) {
      SPAN.classList.remove('burger-menu_active');
    } else SPAN.classList.add('burger-menu_active');
  }
  if (BURGER_MENU.classList.contains('show-menu')) {
    BURGER_MENU.classList.remove('show-menu');
  } else BURGER_MENU.classList.add('show-menu');
});
SWITCH_MODE.addEventListener('click', (event) => { // переключатель
  if (event.target.checked === true) {
    CARD_LIST.forEach(el => el.classList.add('container-card__items_mode-play'));
    BURGER_MENU.classList.add('burger-menu__menu_mode-play');
    SWITCH_MODE_LABEL.classList.add('switch-mode__for_mode-play');
    SWITCH_MODE_LABEL.innerHTML = 'Exam';
    stateNow.mode = 'exam'; // фиксируем состояние
    if (stateNow.category !== 'Main page' && stateNow.category !== '') { // работает только для страницы с карточками
      CARDS_CONTAINER.querySelectorAll('img').forEach(el => el.classList.add('container-card__items__img_exam'));
      START_BTN.classList.add('show');
      START_BTN.classList.remove('delete');
    }
  } else {
    CARD_LIST.forEach(el => el.classList.remove('container-card__items_mode-play'));
    BURGER_MENU.classList.remove('burger-menu__menu_mode-play');
    SWITCH_MODE_LABEL.classList.remove('switch-mode__for_mode-play');
    SWITCH_MODE_LABEL.innerHTML = 'Train';
    stateNow.mode = 'train';
    if (stateNow.category !== 'Main page' && stateNow.category !== '') {
      const ERROR_STARS = document.querySelectorAll('.star-error');
      const STARS = document.querySelectorAll('.star');
      CARDS_CONTAINER.querySelectorAll('img').forEach(el => el.classList.remove('container-card__items__img_exam'));
      START_BTN.classList.remove('show');
      REPEAT_BTN.classList.remove('show'); // убираем производство от exam
      ERROR_STARS.forEach(el => el.remove());
      STARS.forEach(el => el.remove());
      document.querySelectorAll('img').forEach(el => el.classList.remove('inactive'));
      document.querySelectorAll('.container-card__items-in-section').forEach(el => el.classList.remove('inactive-block'));
    }
  }
});

BURGER_MENU.addEventListener('click', (event) => {
  stateNow.category = event.target.innerHTML;
  sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
});
CARDS_CONTAINER.addEventListener('click', (event) => { // запоминаем категорию для генерации страницы
  if (event.target.classList.contains('container-card__items_rotate')) return;
  if (event.target.tagName === 'IMG') {
    stateNow.category = event.target.nextElementSibling.innerHTML;
    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
  } else if (event.target.tagName === 'P') {
    stateNow.category = event.target.innerHTML;
    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
  } else {
    stateNow.category = event.target.querySelector('p').innerHTML;
    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
  }
});
if (typeof sessionStorage.stateNow !== 'undefined') { // берем режим если вернулись с другой страницы
  stateNow = JSON.parse(sessionStorage.getItem('stateNow'));
  mode = stateNow.mode;
}
if (stateNow.mode === 'exam') { // меняем свойства в зависимости от режима
  SWITCH_MODE.checked = true;
  CARD_LIST.forEach(el => el.classList.add('container-card__items_mode-play'));
  BURGER_MENU.classList.add('burger-menu__menu_mode-play');
  SWITCH_MODE_LABEL.classList.add('switch-mode__for_mode-play');
  SWITCH_MODE_LABEL.innerHTML = 'Exam';
} else {
  SWITCH_MODE.checked = false;
  CARD_LIST.forEach(el => el.classList.remove('container-card__items_mode-play'));
  BURGER_MENU.classList.remove('burger-menu__menu_mode-play');
  SWITCH_MODE_LABEL.classList.remove('switch-mode__for_mode-play');
  SWITCH_MODE_LABEL.innerHTML = 'Train';
}
