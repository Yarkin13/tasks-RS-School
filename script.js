const BURGER_BTN = document.getElementById('burgerMenu');
BURGER_BTN.addEventListener('click', () => {
    if(document.querySelector('span').classList.contains('burgerMenu_active')) {
        document.querySelector('span').classList.remove('burgerMenu_active')
    } else document.querySelector('span').classList.add('burgerMenu_active');
})

