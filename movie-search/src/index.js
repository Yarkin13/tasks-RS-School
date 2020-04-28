import Swiper from 'swiper';
import {
  getMovieInfo, drawPosters, drawTitle, drawYear, getMovieRate,getImdbID
} from './request.js';

const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

document.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  const text = document.querySelector('input').value;
  const data = getMovieInfo(1, text);
  data.then((data) => {
    drawPosters(data);
    drawTitle(data);
    drawYear(data);
    const idArray = getImdbID(data);
    getMovieRate(idArray);
  })
});

mySwiper.on('reachEnd', () => {
  const text = document.querySelector('input').value;
  /* const data = getMovieArray(2, text); */
  mySwiper.appendSlide('<div class="swiper-slide">Slide 10"</div>');
  mySwiper.update();
});
