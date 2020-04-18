const arrayCards = cards[indexCategory + 1];
const resultLine = document.querySelector('.result');
const MODAL = document.createElement('div');
MODAL.className = 'modal';
function returnMainPage() {
  return document.location.href = 'index.html';
}
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

function* generator() {
  let i = 1;
  while (i < 8) {
    oneItemAudio(i);
    i += 1;
    yield;
  }
}

const exam = generator();

let k = 0;
let error = 0;

START_BTN.addEventListener('click', () => {
  k = 0;
  error = 0;
  arrayCards.sort(() => Math.random() - 0.5);
  oneItemAudio(k);
  event.target.classList.add('delete');
  REPEAT_BTN.classList.add('show');
  CARDS_CONTAINER.addEventListener('click', (event) => {
    if (stateNow.mode === 'train') return;
    if (event.target.classList.contains('container-cards')) return;
    if (event.target.nextElementSibling.innerHTML === arrayCards[k].word) {
      exam.next();
      k += 1;
      addStar();
      audioCorrect();
      event.target.classList.add('inactive');
      event.target.parentNode.classList.add('inactive-block');
      arrayAnalytics = JSON.parse(localStorage.getItem('arrayAnalytics'));
      const indexForAnalytics = arrayAnalytics.find((el) => el.word === event.target.nextElementSibling.innerHTML);
      indexForAnalytics.correctClick += 1;
      localStorage.setItem('arrayAnalytics', JSON.stringify(arrayAnalytics));
    } else {
      addStarError();
      audioError();
      error += 1;
      arrayAnalytics = JSON.parse(localStorage.getItem('arrayAnalytics'));
      const indexForAnalytics = arrayAnalytics.find((el) => el.word === arrayCards[k].word);
      indexForAnalytics.incorrectClick += 1;
      localStorage.setItem('arrayAnalytics', JSON.stringify(arrayAnalytics));
    }
    if (k === 8) {
      if (error === 0) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = './audio/success.mp3';
        audio.play();
        document.querySelector('.container').classList.add('delete');
        MODAL.className = 'modal-success';
        document.body.append(MODAL);
        setTimeout(returnMainPage, 4000);
      } else {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = './audio/failure.mp3';
        audio.play();
        document.querySelector('.container').classList.add('delete');
        MODAL.className = 'modal-failure';
        MODAL.innerText = `Errors: ${error}`;
        document.body.append(MODAL);
        setTimeout(returnMainPage, 4000);
      }
    }
  });
});

REPEAT_BTN.addEventListener('click', (event) => {
  oneItemAudio(k);
});
