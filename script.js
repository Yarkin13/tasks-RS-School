const BURGER_BTN = document.getElementById('burger-checkbox');
BURGER_BTN.addEventListener('click', (event) => {
    let target = event.target;
    console.log(event.target)
    if(target.tagName === 'SPAN' || target.tagName === 'INPUT') {
        if(document.querySelector('span').classList.contains('burgerMenu_active')) {
            document.querySelector('span').classList.remove('burgerMenu_active')
        } else document.querySelector('span').classList.add('burgerMenu_active');
    }
    if(document.querySelector('.menu').classList.contains('showMenu')) {
        document.querySelector('.menu').classList.remove('showMenu')
    } else document.querySelector('.menu').classList.add('showMenu')
})

