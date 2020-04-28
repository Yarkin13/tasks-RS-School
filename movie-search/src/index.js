import Swiper from 'swiper';
var mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  loop: true,
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
  slidesPerView: 4
})

 async function getMovieArray(page, search) {
  const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=2e0bd215`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  return data
 }


 document.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  const text = document.querySelector('input').value;
  const data = getMovieArray(1, text);
  let data1
  data.then((data1) => {
    return data1;
  })
  console.log(data1)
  /* const postersArray = [];
  const slides = document.querySelector('.swiper-wrapper');
  for (let i = 0; i < data.Search.length; i += 1) {
    postersArray[i] = data.Search[i].Poster;
  }
  let j = 0;
  slides.querySelectorAll('img').forEach((el) => {
    el.src = postersArray[j];
    j++
  }) */
 })
