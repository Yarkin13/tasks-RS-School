const category = sessionStorage.getItem('category');
CARDS.addEventListener('click', (event) => {
  if (event.target.classList.contains('container-card__items_rotate')) return;
  if (event.target.tagName === 'IMG') {
    sessionStorage.setItem('card', event.target.nextElementSibling.innerHTML);
  }
  if (event.target.tagName === 'P') {
    sessionStorage.setItem('card', event.target.innerHTML);
  }
  const searchAudio = sessionStorage.getItem('card');
  if (/[а-я]+/.test(searchAudio)) return;
  const card = cards[indexCategory + 1].find(el => el.word === searchAudio);
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `${card.audioSrc}`;
  audio.play();
});

CARDS.addEventListener('click', (event) => {
  if (event.target.classList.contains('container-card__items_rotate')) {
    const searchTranslate = event.target.parentNode.querySelector('p').innerHTML;
    const card = cards[indexCategory + 1].find(el => el.word === searchTranslate);
    event.target.parentNode.classList.add('rotate');
    event.target.parentNode.querySelector('p').innerHTML = `${card.translation}`;
    event.target.parentNode.querySelector('p').classList.add('rotate');
    event.target.classList.add('hide');
    event.target.parentNode.addEventListener('mouseleave', (e) => {
      if (/[a-z]+/.test(e.target.querySelector('p').innerHTML)) return;
      const searchWord = e.target.querySelector('p').innerHTML;
      const card = cards[indexCategory + 1].find(el => el.translation === searchWord);
      e.target.classList.remove('rotate');
      e.target.querySelector('p').innerHTML = `${card.word}`;
      e.target.querySelector('p').classList.remove('rotate');
      e.target.lastElementChild.classList.remove('hide');
    });
  }
});
