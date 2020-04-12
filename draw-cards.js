stateNow = JSON.parse(sessionStorage.getItem('stateNow'));
mode = stateNow.mode;
if (mode === 'exam') {
  document.getElementById('switch-mode').checked = true;
  stateNow.mode = 'exam';
  document.querySelectorAll('.container-card__items__img').forEach(el => el.classList.add('container-card__items__img_exam'))
  document.getElementById('mode').innerHTML = 'Mode:  exam';
  document.querySelector('.burger-menu__menu').classList.add('burger-menu__menu_mode-play');
  document.querySelector('.switch-mode__for').classList.add('switch-mode__for_mode-play');
  document.querySelector('.game-options').classList.remove('hide');
} else {
  document.getElementById('switch-mode').checked = false;
  stateNow.mode = 'train';
  document.querySelectorAll('.container-card__items__img').forEach(el => el.classList.remove('container-card__items__img_exam'));
  document.querySelector('.game-options').classList.add('hide');
};
const indexCategory = cards[0].indexOf(stateNow.category);
let i = 0;
document.getElementById('container-cards').querySelectorAll('img').forEach((el) => {
  el.src = cards[indexCategory + 1][i].image;
  i += 1;
});
i = 0;
document.getElementById('container-cards').querySelectorAll('p').forEach((el) => {
  el.innerText = cards[indexCategory + 1][i].word;
  i += 1;
});

