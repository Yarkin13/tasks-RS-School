import Swiper from 'swiper';
import {
  getMovieInfo, createMoviesInfo, addRating, getTranslate,
} from './request-functions';

import {
  MovieFactory,
} from './factory-pattern';
import './style.css';
import './swiper.css';
import '@babel/polyfill';
const swiperWrapper = document.querySelector('.swiper-wrapper');
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
const btnClear = document.querySelector('.btn-clear');
const input = document.querySelector('.input');
const subField = document.querySelector('.sub-field');
const load = document.querySelector('.load');
let page = 1;
document.addEventListener('DOMContentLoaded', () => {
  input.focus();
  load.classList.add('show');
});

async function drawMovieCards(textRequest = 'war', page) {
  const data = await getMovieInfo(page, textRequest);
  let moviesInfo = createMoviesInfo(data);
  moviesInfo = await addRating(moviesInfo);
  swiperWrapper.innerHTML = '';
  moviesInfo.forEach((movie) => {
    const movieFactory = new MovieFactory(movie, swiperWrapper);
    movieFactory.create();
  });
  mySwiper.slideTo(0);
  mySwiper.update();
  load.classList.remove('show');
  return data;
}

async function drawMovieCardsForAddSlides(textRequest = 'war', page) {
  const data = await getMovieInfo(page, textRequest);
  let moviesInfo = createMoviesInfo(data);
  moviesInfo = await addRating(moviesInfo);
  moviesInfo.forEach((movie) => {
    const movieFactory = new MovieFactory(movie, swiperWrapper);
    movieFactory.create();
  });
  mySwiper.update();
  load.classList.remove('show');
  return data;
}

drawMovieCards('war', 1);

btnClear.addEventListener('click', (event) => {
  event.preventDefault();
  input.value = '';
});

btn.addEventListener('click', (event) => {
  page = 1;
  event.preventDefault();
  load.classList.add('show');
  subField.innerText = '';
  const textRequest = document.querySelector('input').value;
  if (textRequest === '') {
    load.classList.remove('show');
    return;
  }
  if (/[a-zA-Z]/.test(textRequest)) {
    const data = drawMovieCards(textRequest);
    data.catch(() => {
      subField.innerText = `No result for "${textRequest}"`;
      load.classList.remove('show');
    });
  } else {
    const translate = getTranslate(textRequest);
    translate.then((data) => data.text[0])
      .then((data) => {
        const dataRequest = drawMovieCards(data);
        dataRequest.then(() => {
          subField.innerText = `Showing results for "${data}"`;
        });
        dataRequest.catch(() => {
          subField.innerText = `No result for "${textRequest}"`;
          load.classList.remove('show');
        });
      });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    page = 1;
    event.preventDefault();
    load.classList.add('show');
    subField.innerText = '';
    const textRequest = document.querySelector('input').value;
    if (textRequest === '') {
      load.classList.remove('show');
      return;
    }
    if (/[a-zA-Z]/.test(textRequest)) {
      const data = drawMovieCards(textRequest);
      data.catch(() => {
        subField.innerText = `No result for "${textRequest}"`;
        load.classList.remove('show');
      });
    } else {
      const translate = getTranslate(textRequest);
      translate.then((data) => data.text[0])
        .then((data) => {
          const dataRequest = drawMovieCards(data);
          dataRequest.then(() => {
            subField.innerText = `Showing results for "${data}"`;
          });
          dataRequest.catch(() => {
            subField.innerText = `No result for "${textRequest}"`;
            load.classList.remove('show');
          });
        });
    }
  }
});

mySwiper.on('reachEnd', () => {
  load.classList.add('show');
  const textRequest = document.querySelector('input').value;
  if (textRequest === '') {
    load.classList.remove('show');
    return;
  }
  page += 1;
  if (/[a-zA-Z]/.test(textRequest)) {
    drawMovieCardsForAddSlides(textRequest, page);
  } else {
    const translate = getTranslate(textRequest);
    translate.then((textRequest) => {
      drawMovieCardsForAddSlides(textRequest.text[0], page);
    });
  }
});
