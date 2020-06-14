import { getWords } from './services/get-words.service';
import { mainPageResultBlockNode } from './nodes';

const wrapper = document.querySelector('.wrapper');

export default class MainPageClass {
  constructor(mainPageContentNode, mainPageResultBlockNode) {
    this.mainPageContentNode = mainPageContentNode;
    this.mainPageResultBlockNode = mainPageResultBlockNode;
  }

  renderMainPageWrapper() {
    wrapper.insertAdjacentHTML('afterbegin', '<div class="main-page"></div>');
  }

  renderMainPageHeader(mainPageWrapper, mainPageHeaderNode) {
    mainPageWrapper.insertAdjacentHTML('beforeend', mainPageHeaderNode);
  }

  async __renderPuzzles() {
    const exampleList = document.querySelectorAll('.main-page__main-block__string');
    const textData = await getWords();
    const state = JSON.parse(localStorage.getItem('state'));
    exampleList[state.currentExample - 1].classList.add('current');
    exampleList.forEach((el, index) => {
      el.style.gridTemplateColumns = `repeat(${textData[index].example.length}, 1fr)`;
      textData[index].example.forEach((word, indexWordInString) => {
        el.insertAdjacentHTML('beforeend', `<div class="main-page__main-block__string__el" index="${indexWordInString}"><p>${word}</p></div>`);
      });
    });

    const wordsList = document.querySelectorAll('.main-page__main-block__string__el');
    wordsList.forEach((el) => {
      el.insertAdjacentHTML('beforeend', '<canvas class="main-page__main-block__string__el__puzzle"></canvas>');
    });

    exampleList.forEach((string, indexString) => {
      string.querySelectorAll('.main-page__main-block__string__el__puzzle').forEach((puzzle, indexPuzzle) => {
        if (string.querySelectorAll('.main-page__main-block__string__el__puzzle').length > 10) {
          string.querySelectorAll('.main-page__main-block__string__el__puzzle').forEach((el) => {
            el.parentNode.style.fontSize = '12px';
          });
        }
        this.createPuzzle(puzzle, string.querySelectorAll('.main-page__main-block__string__el__puzzle').length, indexPuzzle, indexString);
        this.fillPuzzle(puzzle, string.querySelectorAll('.main-page__main-block__string__el__puzzle').length, indexPuzzle, indexString);
      });
    });

    this.audioHint();

    document.querySelectorAll('.main-page__main-block__string').forEach((el, index) => {
      if (index >= state.currentExample - 1) {
        const randomArray = [...el.querySelectorAll('.main-page__main-block__string__el')].sort(() => Math.random() - 0.5);
        el.innerHTML = '';
        el.append(...randomArray);
      }
    });
  }


  /* renderPuzzleInCurrentString(stateBackgroundHint) {  // commented out because after the deadline I want to finish
    const exampleList = document.querySelectorAll('.main-page__main-block__string');
    const state = JSON.parse(localStorage.getItem('state'));
    exampleList[state.currentExample - 1].querySelectorAll('.main-page__main-block__string__el__puzzle').forEach((el, indexPuzzle) => {
      this.createPuzzle(el, exampleList[state.currentExample - 1].querySelectorAll('.main-page__main-block__string__el__puzzle').length, indexPuzzle, state.currentExample - 1);
      if(stateBackgroundHint === true) {
        this.fillPuzzle(el, exampleList[state.currentExample - 1].querySelectorAll('.main-page__main-block__string__el__puzzle'), el.parentNode.getAttribute('index'), state.currentExample - 1);
      }
    })
  } */


  createPuzzle(puzzle, length, index, indexString) {
    const ctx = puzzle.getContext('2d');
    const state = JSON.parse(localStorage.getItem('state'));
    puzzle.height = 50;
    puzzle.width = puzzle.parentNode.offsetWidth + (length * (Math.sqrt(2) / 2 + 1) * 10) / length;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 0);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 17);
    ctx.arc(puzzle.width + 5 - (Math.sqrt(2) / 2 + 1) * 10, 25, 10, 5 / 4 * Math.PI + 0.2, 3 / 4 * Math.PI - 0.2, false);
    ctx.moveTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 33);
    ctx.lineTo(puzzle.width - (Math.sqrt(2) / 2 + 1) * 10, 50);
    ctx.lineTo(0, 50);
    if (index === 0) {
      ctx.lineTo(0, 0);
    } else {
      ctx.lineTo(0, 33);
      ctx.arc(5, 25, 10, 3 / 4 * Math.PI, 5 / 4 * Math.PI, true);
      ctx.lineTo(0, 17);
      ctx.lineTo(0, 0);
    }
    ctx.stroke();
    ctx.clip();
  }

  fillPuzzle(puzzle, length, index, indexString) {
    const ctx = puzzle.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const img = new Image(50, 50);
    img.src = './assets/start-page.jpg';
    img.onload = function () {
      ctx.drawImage(img, puzzle.width * index - index * ((Math.sqrt(2) / 2 + 1) * 10), 50 * indexString, puzzle.width, puzzle.height, 1, 1, puzzle.width, puzzle.height);
    };
  }

  async renderMainPageContent(mainPageContentNode) {
    document.querySelector('.main-page__active-hints').insertAdjacentHTML('afterend', mainPageContentNode);
    await this.__renderPuzzles();
  }

  renderMainPageResultBlock(mainPageResultBlockNode) {
    const state = JSON.parse(localStorage.getItem('state'));
    document.querySelector('.main-page__main-block').insertAdjacentHTML('afterend', mainPageResultBlockNode);
    const resultBlock = document.querySelector('.main-page__result-block');
    resultBlock.style.gridTemplateColumns = `repeat(${state.words[state.currentExample - 1].example.length}, 1fr)`;
    for (let i = 0; i < state.words[state.currentExample - 1].example.length; i += 1) {
      const resultEl = document.createElement('div');
      resultEl.setAttribute('isFree', 'true');
      resultEl.classList.add('main-page__result-block__el');
      resultBlock.append(resultEl);
    }
    this.dragAndDrop();
    this.clickOnPuzzle();
  }

  renderMainPageButtonsBlock(mainPageWrapper, mainPageButtonsBlockNode) {
    mainPageWrapper.insertAdjacentHTML('beforeend', mainPageButtonsBlockNode);
  }

  dragAndDrop() {
    const exampleList = document.querySelectorAll('.main-page__main-block__string');
    const state = JSON.parse(localStorage.getItem('state'));
    exampleList[state.currentExample - 1].children.forEach((el) => {
      el.setAttribute('draggable', 'true');
    });
    const words = document.querySelectorAll('.main-page__main-block__string__el') || document.querySelectorAll('.main-page__main-block__block__el');
    const cells = document.querySelectorAll('.main-page__result-block__el');
    let draggingItem;
    let currentWord;
    const dragStart = function () {
      draggingItem = event.target;
      currentWord = this;
      setTimeout(() => {
        this.classList.add('hide');
      }, 0);
      this.style.left = '0';
      this.parentNode.setAttribute('isFree', 'true');
    };
    const dragEnd = function () {
      this.classList.remove('hide');
    };

    const dragOver = function (evt) {
      evt.preventDefault();
    };

    const dragEnter = function (evt) {
      evt.preventDefault();
      this.classList.add('hovered');
    };

    const dragLeave = function () {
      this.classList.remove('hovered');
    };


    const dragDrop = function (event) {
      if (this.children.length !== 0) {
        if (event.target == draggingItem) return;
        event.target.parentNode.removeChild(event.target.parentNode.firstChild);
        draggingItem.parentNode.append(event.target);
        this.append(draggingItem);
        this.classList.remove('hovered');
        event.target.parentNode.setAttribute('isFree', 'false');
      } else {
        this.append(currentWord);
        this.classList.remove('hovered');
        this.setAttribute('isFree', 'false');
      }
    };

    words.forEach((word) => {
      word.addEventListener('dragstart', dragStart);
      word.addEventListener('dragend', dragEnd);
    });

    cells.forEach((cell) => {
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('drop', dragDrop);
    });
  }

  clickOnPuzzle() {
    const exampleList = document.querySelectorAll('.main-page__main-block__string');
    const state = JSON.parse(localStorage.getItem('state'));
    const resultBlock = document.querySelector('.main-page__result-block');
    function appendPuzzle() {
      const cell = resultBlock.querySelector('[isfree="true"]');
      if (cell == null) return;
      cell.append(this);
      cell.setAttribute('isFree', 'false');
      this.removeEventListener('click', appendPuzzle);
    }
    const words = exampleList[state.currentExample - 1].querySelectorAll('.main-page__main-block__string__el');
    words.forEach((word) => {
      word.addEventListener('click', appendPuzzle);
      word.style.cursor = 'pointer';
    });
  }

  checkResultBlock() {
    const state = JSON.parse(localStorage.getItem('state'));
    const resultBlock = document.querySelector('.main-page__result-block');
    const resultNodes = resultBlock.querySelectorAll('.main-page__main-block__string__el');
    const result = [];
    resultNodes.forEach((el) => {
      result.push(el.textContent);
    });
    let count = 0;
    resultNodes.forEach((el, index) => {
      if (el.textContent === state.words[state.currentExample - 1].example[index]) {
        el.style.backgroundColor = 'green';
        count += 1;
      } else {
        el.style.backgroundColor = 'red';
      }
    });
    if (count === result.length && count !== 0) {
      function nextExample() {
        const translateBtn = document.querySelector('.main-page__control-block__hints__translate');
        const correctExample = resultBlock.querySelectorAll('.main-page__main-block__string__el');
        const currentString = document.querySelectorAll('.main-page__main-block__string')[state.currentExample - 1];
        const nextString = document.querySelectorAll('.main-page__main-block__string')[state.currentExample];
        correctExample.forEach((el) => {
          el.style.backgroundColor = '';
          el.setAttribute('draggable', 'false');
          el.style.cursor = '';
          el.style.pointerEvents = 'none';
        });
        currentString.classList.remove('current');
        nextString.classList.add('current');
        currentString.append(...correctExample);
        state.currentExample += 1;
        localStorage.setItem('state', JSON.stringify(state));
        const mainPage = new MainPageClass();
        mainPage.dragAndDrop();
        mainPage.clickOnPuzzle();
        resultBlock.parentNode.removeChild(resultBlock);
        mainPage.renderMainPageResultBlock(mainPageResultBlockNode);
        localStorage.setItem('state', JSON.stringify(state));
        if (translateBtn.classList.contains('active') === true) translateBtn.classList.remove('active');
        mainPage.showOrHideTranslate(translateBtn.classList.contains('active'));
        mainPage.audioHint();
      }
      setTimeout(() => nextExample(), 1000);
    }
  }

  defineHintsState() {
    const state = JSON.parse(localStorage.getItem('state'));
    const translateBtn = document.querySelector('.main-page__control-block__hints__translate');
    const audioBeginBtn = document.querySelector('.main-page__control-block__hints__audio-begin');
    const audioRepeatBtn = document.querySelector('.main-page__control-block__hints__audio-repeat');
    const backgroundBtn = document.querySelector('.main-page__control-block__hints__background');
    const translateNode = document.querySelector('.main-page__active-hints__translate');
    if (state.translateHint === true) {
      translateBtn.classList.add('active');
      translateNode.textContent = state.words[state.currentExample - 1].translate;
    } else {
      translateBtn.classList.remove('active');
    }
    if (state.audioBeginHint === true) {
      audioBeginBtn.classList.add('active');
    } else {
      audioBeginBtn.classList.remove('active');
    }
    if (state.audioRepeatHint === true) {
      audioRepeatBtn.classList.add('active');
    } else {
      audioRepeatBtn.classList.remove('active');
    }
  }

  showOrHideTranslate(hintsState) {
    const state = JSON.parse(localStorage.getItem('state'));
    const translateNode = document.querySelector('.main-page__active-hints__translate');
    if (hintsState === true) {
      translateNode.textContent = state.words[state.currentExample - 1].translate;
    } else {
      translateNode.textContent = '';
    }
  }

  audioHint() {
    const state = JSON.parse(localStorage.getItem('state'));
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${state.words[state.currentExample - 1].audioSrc}`;
    audio.play();
  }

  correctSequence() {
    const state = JSON.parse(localStorage.getItem('state'));
    const resultBlock = document.querySelector('.main-page__result-block');
    const inCorrectSequence = document.querySelector('.main-page__result-block').querySelectorAll('.main-page__main-block__string__el');
    const correctSequence = [...inCorrectSequence].sort((a, b) => a.getAttribute('index') - b.getAttribute('index'));
    resultBlock.append(...correctSequence);
  }
}
