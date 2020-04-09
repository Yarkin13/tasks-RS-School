const BURGER_BTN = document.getElementById('burger-checkbox');
const MODE = document.getElementById('mode');
BURGER_BTN.addEventListener('click', (event) => {
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
SWITCH_MODE.addEventListener('click', (event) => {
  if (event.target.checked === true) {
    document.querySelectorAll('.container-card__items').forEach(el => el.classList.add('container-card__items_mode-play'));
    MODE.innerHTML = 'Mode:  exam';
    document.querySelector('.burger-menu__menu').classList.add('burger-menu__menu_mode-play')
    document.querySelector('.switch-mode__for').classList.add('switch-mode__for_mode-play')
  } else {
    document.querySelectorAll('.container-card__items').forEach(el => el.classList.remove('container-card__items_mode-play'));
    MODE.innerHTML = 'Mode: train'
    document.querySelector('.burger-menu__menu').classList.remove('burger-menu__menu_mode-play')
    document.querySelector('.switch-mode__for').classList.remove('switch-mode__for_mode-play')
  }
});
console.log(object.name)
