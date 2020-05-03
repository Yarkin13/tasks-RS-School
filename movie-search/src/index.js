import Swiper from 'swiper';
import {
  getMovieInfoFc, createMoviesInfo, addRating, getTranslate,
} from './requestfactory.js';

import {
  MovieFactory, Movie,
} from './factory-pattern.js';

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

load.classList.add('show');

document.addEventListener('DOMContentLoaded', () => {
  input.focus();
});

async function drawMovieCards(textRequest = 'war', page = 1) {
  const data = await getMovieInfoFc(page, textRequest);
  let moviesInfo = createMoviesInfo(data);
  moviesInfo = await addRating(moviesInfo);
  swiperWrapper.innerHTML = '';
  moviesInfo.forEach((movie) => {
    const movieFactory = new MovieFactory(movie, swiperWrapper);
    movieFactory.create();
  });
  mySwiper.update();
  load.classList.remove('show');
  return data;
}

drawMovieCards();

btnClear.addEventListener('click', (event) => {
  event.preventDefault();
  input.value = '';
});

btn.addEventListener('click', (event) => {
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
        dataRequest.then(() => subField.innerText = `Showing results for "${data}"`);
        dataRequest.catch(() => {
          subField.innerText = `No result for "${textRequest}"`;
          load.classList.remove('show');
        });
      });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
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
          dataRequest.then(() => subField.innerText = `Showing results for "${data}"`);
          dataRequest.catch(() => {
            subField.innerText = `No result for "${textRequest}"`;
            load.classList.remove('show');
          });
        });
    }
  }
});

mySwiper.on('reachEnd', () => {
  const textRequest = document.querySelector('input').value;
  drawMovieCards(textRequest = 'war', 2)
  mySwiper.update();
});