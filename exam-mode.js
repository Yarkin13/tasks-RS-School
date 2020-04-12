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

let k = 0

document.querySelector('.game-options-start').addEventListener('click', () => {
  arrayCards.sort(() => Math.random() - 0.5);
  oneItemAudio(k);
  event.target.classList.add('delete');
  const repeat = document.getElementById('repeat');
  repeat.classList.add('show');
  CARDS.addEventListener('click', (event) => {
    if (stateNow.mode === 'train') return;
    if (event.target.classList.contains('container-cards')) return;
    if (event.target.nextElementSibling.innerHTML === arrayCards[k].word) {
      exam.next();
      k += 1;
      addStar();
      audioCorrect();
      event.target.classList.add('inactive');
      event.target.parentNode.classList.add('inactive-block');
    } else {
      addStarError();
      audioError();
    }
    if (k === 8) document.location.href = 'index.html';
  });
});

document.getElementById('repeat').addEventListener('click', (event) => {
  oneItemAudio(k);
})
