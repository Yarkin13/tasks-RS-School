CARDS_CONTAINER.addEventListener('click', (event) => { //добавление звука
  if (event.target.classList.contains('container-card__items_rotate')) return;
  if (event.target.tagName === 'IMG') {
    stateNow.currentCard = event.target.nextElementSibling.innerHTML;
  }
  if (event.target.tagName === 'P') {
    stateNow.currentCard = event.target.innerHTML;
  }
  if(stateNow.mode === 'exam') return;
  arrayAnalytics = JSON.parse(localStorage.getItem('arrayAnalytics'));
  let indexForAnalytics = arrayAnalytics.find(el => el.word === stateNow.currentCard);
  indexForAnalytics.clicksInTrain += 1;
  localStorage.setItem('arrayAnalytics', JSON.stringify(arrayAnalytics));
  const searchAudio = stateNow.currentCard;
  if (/[а-я]+/.test(searchAudio)) return;
  const card = cards[indexCategory + 1].find(el => el.word === searchAudio);
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `${card.audioSrc}`;
  audio.play();
});

CARDS_CONTAINER.addEventListener('click', (event) => { //флип
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
