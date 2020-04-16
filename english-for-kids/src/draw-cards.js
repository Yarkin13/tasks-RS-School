
stateNow = JSON.parse(sessionStorage.getItem('stateNow')); // берем категорию
mode = stateNow.mode;

if (mode === 'exam') { // принмиаем свойства в зависимости от режима
  SWITCH_MODE.checked = true;
  stateNow.mode = 'exam';
  document.querySelectorAll('.container-card__items__img').forEach((el) => el.classList.add('container-card__items__img_exam'));
  BURGER_MENU.classList.add('burger-menu__menu_mode-play');
  SWITCH_MODE_LABEL.classList.add('switch-mode__for_mode-play');
  START_BTN.classList.add('show');
  SWITCH_MODE_LABEL.innerHTML = 'Exam';
} else {
  SWITCH_MODE.checked = false;
  stateNow.mode = 'train';
  document.querySelectorAll('.container-card__items__img').forEach((el) => el.classList.remove('container-card__items__img_exam'));
  START_BTN.classList.remove('show');
  SWITCH_MODE_LABEL.innerHTML = 'Train';
}
const indexCategory = cards[0].indexOf(stateNow.category); // определяем индекс
// категории из общего объекта
let i = 0;

document.getElementById('container-cards').querySelectorAll('img').forEach((el) => { // отрисоываем картинки и значения
  el.src = cards[indexCategory + 1][i].image;
  i += 1;
});
i = 0;
document.getElementById('container-cards').querySelectorAll('p').forEach((el) => {
  el.innerText = cards[indexCategory + 1][i].word;
  i += 1;
});
