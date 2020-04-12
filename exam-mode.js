const arrayCards = cards[indexCategory + 1];
const resultLine = document.querySelector('.result');
function oneItemAudio(i) {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `${arrayCards[i].audioSrc}`;
  audio.play();
}
function audioCorrect() {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = './audio/correct.mp3';
  audio.play();
}
function audioError() {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = './audio/error.mp3';
  audio.play();
}
function addStar() {
  const star = document.createElement('div');
  star.className = 'star';
  resultLine.append(star);
}

function addStarError() {
  const star = document.createElement('div');
  star.className = 'star-error';
  resultLine.append(star);
}

function* generator() { //генератор для выдачи последоватльных слов
  let i = 1;
  while (i < 8) {
    oneItemAudio(i);
    i += 1;
    yield;
  }
}

const exam = generator();

document.querySelector('.game-options').addEventListener('click', () => {
  arrayCards.sort(() => Math.random() - 0.5);
  let i = 0;
  oneItemAudio(i);
  CARDS.addEventListener('click', (event) => {
    if (event.target.classList.contains('container-cards')) return;
    if (event.target.nextElementSibling.innerHTML === arrayCards[i].word) {
      exam.next();
      i += 1;
      addStar();
      audioCorrect();
      event.target.classList.add('inactive');
      event.target.parentNode.classList.add('inactive-block');
    } else {
      addStarError();
      audioError();
    }
    if (i === 8) document.location.href = 'index.html';
  });
});
