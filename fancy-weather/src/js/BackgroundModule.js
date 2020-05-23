export const BackgroundModule = (function () {
  const node = document.querySelector('.wrapper');
  const number = Math.round(Math.random() * 13);
  const backgroundList = ['./assets/background/background-1.jpg', './assets/background/background-2.jpg',
    './assets/background/background-3.jpg', './assets/background/background-3.jpg',
    './assets/background/background-5.jpg', './assets/background/background-4.jpg',
    './assets/background/background-7.jpg', './assets/background/background-5.jpg',
    './assets/background/background-9.jpg', './assets/background/background-6.jpg',
    './assets/background/background-11.jpg', './assets/background/background-7.jpg',
    './assets/background/background-13.jpg', './assets/background/background-8.jpg'];
  const renderBackground = () => {
    node.style.background = `url(${backgroundList[number]})`;
    node.style.backgroundAttachment = 'fixed';
    node.style.backgroundRepeat = 'no-repeat';
    /* node.style.backgroundSize = '100%'; */
    node.style.backgroundPosition = 'center';
    console.log(number);
  };
  return {
    renderBackground,
  };
}());
