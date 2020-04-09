const BURGER_BTN = document.getElementById('burger-checkbox');
BURGER_BTN.addEventListener('click', (event) => {
    let target = event.target;
    if(target.tagName === 'SPAN' || target.tagName === 'INPUT') {
        if(document.querySelector('span').classList.contains('burger-menu_active')) {
            document.querySelector('span').classList.remove('burger-menu_active')
        } else document.querySelector('span').classList.add('burger-menu_active');
    }
    if(document.querySelector('.burger-menu__menu').classList.contains('show-menu')) {
        document.querySelector('.burger-menu__menu').classList.remove('show-menu')
    } else document.querySelector('.burger-menu__menu').classList.add('show-menu')
})

