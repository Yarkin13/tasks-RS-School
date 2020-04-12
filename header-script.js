const BURGER_BTN = document.getElementById('burger-checkbox');
const MODE = document.getElementById('mode');
let stateNow = { // объект текущего состояния
  category: '',
  mode: 'train',
  currentCard: ''
};

BURGER_BTN.addEventListener('click', (event) => { // меню
  const target = event.target;
  if (target.tagName === 'SPAN' || target.tagName === 'INPUT') {
    if (document.querySelector('span').classList.contains('burger-menu_active')) {
      document.querySelector('span').classList.remove('burger-menu_active');
    } else document.querySelector('span').classList.add('burger-menu_active');
  }
  if (document.querySelector('.burger-menu__menu').classList.contains('show-menu')) {
    document.querySelector('.burger-menu__menu').classList.remove('show-menu');
  } else document.querySelector('.burger-menu__menu').classList.add('show-menu');
});
const SWITCH_MODE = document.getElementById('switch-mode');
SWITCH_MODE.addEventListener('click', (event) => { //переключатель
  if (event.target.checked === true) {
    document.querySelectorAll('.container-card__items').forEach(el => el.classList.add('container-card__items_mode-play'));
    document.querySelector('.burger-menu__menu').classList.add('burger-menu__menu_mode-play');
    document.querySelector('.switch-mode__for').classList.add('switch-mode__for_mode-play');
    document.querySelector('.switch-mode__for').innerHTML = 'Exam';
    stateNow.mode = 'exam'; //фиксируем состояние
    if (stateNow.category !== 'Main page' && sessionStorage.length !== 1) { // работает только для стринцы с карточками
      CARDS.querySelectorAll('img').forEach(el => el.classList.add('container-card__items__img_exam'));
      document.querySelector('.game-options').classList.add('show');
    }
  } else {
    document.querySelectorAll('.container-card__items').forEach(el => el.classList.remove('container-card__items_mode-play'));
    document.querySelector('.burger-menu__menu').classList.remove('burger-menu__menu_mode-play');
    document.querySelector('.switch-mode__for').classList.remove('switch-mode__for_mode-play');
    document.querySelector('.switch-mode__for').innerHTML = 'Train';
    stateNow.mode = 'train';
    if (stateNow.category !== 'Main page' && sessionStorage.length !== 1) {
      CARDS.querySelectorAll('img').forEach(el => el.classList.remove('container-card__items__img_exam'));
      document.querySelector('.game-options').classList.remove('show');
    }
  }
});


const MENU_LIST = document.querySelector('.burger-menu__menu');
MENU_LIST.addEventListener('click', (event) => {
  stateNow.category = event.target.innerHTML;
  sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
});
const CARDS = document.querySelector('.container-cards');
CARDS.addEventListener('click', (event) => { //запоминаем категорию для генерации страницы
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
if (sessionStorage.length > 1) { //берем режим если вернулись с другой страницы
  stateNow = JSON.parse(sessionStorage.getItem('stateNow'));
  mode = stateNow.mode;
}
if (stateNow.mode === 'exam') { // меняем свойства в зависимости от режима
  document.getElementById('switch-mode').checked = true;
  document.querySelectorAll('.container-card__items').forEach(el => el.classList.add('container-card__items_mode-play'));
  document.querySelector('.burger-menu__menu').classList.add('burger-menu__menu_mode-play');
  document.querySelector('.switch-mode__for').classList.add('switch-mode__for_mode-play');
  document.querySelector('.switch-mode__for').innerHTML = 'Exam';
} else {
  document.getElementById('switch-mode').checked = false;
  document.querySelectorAll('.container-card__items').forEach(el => el.classList.remove('container-card__items_mode-play'));
  document.querySelector('.burger-menu__menu').classList.remove('burger-menu__menu_mode-play');
  document.querySelector('.switch-mode__for').classList.remove('switch-mode__for_mode-play');
  document.querySelector('.switch-mode__for').innerHTML = 'Train';
}
