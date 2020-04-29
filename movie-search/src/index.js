import Swiper from 'swiper';
import {
  getMovieInfo, drawPosters, drawTitle, drawYear, getMovieRate,getImdbID
} from './request.js';

const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  preventInteractionOnTransition: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
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
    770: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});
const btn = document.querySelector('.btn');
const btnClear = document.querySelector('.btn-clear')
const input = document.querySelector('.input');
document.addEventListener("DOMContentLoaded", () => {
  input.focus();
})

btnClear.addEventListener('click', (event) => {
  event.preventDefault();
  input.value = '';
})

const firstData  = getMovieInfo(1, 'war');
firstData.then((firstData) => {
  drawPosters(firstData);
  drawTitle(firstData);
  drawYear(firstData);
  const idArrayFirst = getImdbID(firstData);
  getMovieRate(idArrayFirst);
})

btn.addEventListener('click', (event) => {
  event.preventDefault();
  const text = document.querySelector('input').value;
  const data = getMovieInfo(1, text);
  data.then((data) => {
    console.log(data)
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
