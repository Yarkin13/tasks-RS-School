import {getWords} from './services/get-words.service'
const wrapper = document.querySelector('.wrapper')


export default class MainPageClass {
  constructor(mainPageContentNode, mainPageResultBlockNode) {
    this.mainPageContentNode = mainPageContentNode;
    this.mainPageResultBlockNode = mainPageResultBlockNode;
  }
  renderMainPageWrapper() {
    wrapper.insertAdjacentHTML('afterbegin', '<div class="main-page"></div>')
  }

  renderMainPageHeader(mainPageWrapper, mainPageHeaderNode) {
    mainPageWrapper.insertAdjacentHTML('beforeend', mainPageHeaderNode)
  }

  async __renderPuzzles() {
    const textList = document.querySelectorAll('.main-page__main-block__string')
    const textData = await getWords();
    const state = JSON.parse(localStorage.getItem('state'));
    document.querySelectorAll('.main-page__main-block__string')[state.currentExample-1].classList.add('current')
    textList.forEach((el, index) => {
      el.style.gridTemplateColumns = `repeat(${textData[index].example.length}, 1fr)`
      textData[index].example.forEach((word) => {
        el.insertAdjacentHTML('beforeend', `<div class="main-page__main-block__string__el"><p>${word}</p></div>`);
      })
    })

    document.querySelectorAll('.main-page__main-block__string__el').forEach((el, index) => {
      el.insertAdjacentHTML('beforeend', `<canvas class="main-page__main-block__string__el__puzzle"></canvas>`);
    })

    document.querySelectorAll('.main-page__main-block__string').forEach((string, indexString) => {
      string.querySelectorAll('.main-page__main-block__string__el__puzzle').forEach((puzzle, indexPuzzle) => {
        if(string.querySelectorAll('.main-page__main-block__string__el__puzzle').length > 10) {
          string.querySelectorAll('.main-page__main-block__string__el__puzzle').forEach(el => {
            el.parentNode.style.fontSize = '11px'
          })
        }
        this.drawPuzzle(puzzle, string.querySelectorAll('.main-page__main-block__string__el__puzzle').length, indexPuzzle, indexString);
        })
    })
    

    document.querySelectorAll('.main-page__main-block__string').forEach((el) => {
      el.querySelectorAll('.main-page__main-block__string__el').forEach((puzzle, index) => {
      })
    })

  }


  drawPuzzle (puzzle, length, index, indexString) {
      const ctx     = puzzle.getContext('2d');
      puzzle.height = 50;
      puzzle.width  = puzzle.parentNode.offsetWidth + (length*(Math.sqrt(2)/2+1)*10)/length
      ctx.lineWidth=1;
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(puzzle.width -(Math.sqrt(2)/2+1)*10, 0);
      ctx.lineTo(puzzle.width -(Math.sqrt(2)/2+1)*10, 17);
      ctx.arc(puzzle.width+5 -(Math.sqrt(2)/2+1)*10, 25, 10, 5/4 * Math.PI + 0.2, 3/4 * Math.PI - 0.2, false)
      ctx.moveTo(puzzle.width -(Math.sqrt(2)/2+1)*10, 33);
      ctx.lineTo(puzzle.width -(Math.sqrt(2)/2+1)*10, 50);
      ctx.lineTo(0, 50);
      ctx.lineTo(0, 33);
      ctx.arc(5, 25, 10, 3/4 * Math.PI, 5/4 * Math.PI, true)
      ctx.lineTo(0, 17);
      ctx.lineTo(0, 0);
      const img = new Image(50,50);
      img.src = './assets/start-page.jpg';
      img.onload = function() {
        ctx.drawImage(img, puzzle.width*index - index*((Math.sqrt(2)/2+1)*10), 50*indexString, puzzle.width, puzzle.height, 1,1, puzzle.width, puzzle.height);

      };
      ctx.stroke();
      ctx.clip()
    
  }

  async renderMainPageContent(mainPageContentNode) {
    document.querySelector('.main-page__active-hints').insertAdjacentHTML('afterend', mainPageContentNode)
    await this.__renderPuzzles();
    this.dragAndDrop()
    this.click();
  }

  renderMainPageResultBlock(mainPageResultBlockNode) {
    const state = JSON.parse(localStorage.getItem('state'));
    document.querySelector('.main-page__main-block').insertAdjacentHTML('afterend', mainPageResultBlockNode);
    const resultBlock = document.querySelector('.main-page__result-block');
    resultBlock.style.gridTemplateColumns = `repeat(${state.words[state.currentExample - 1].example.length}, 1fr)`
  }

  renderMainPageButtonsBlock(mainPageWrapper, mainPageButtonsBlockNode) {
    mainPageWrapper.insertAdjacentHTML('beforeend', mainPageButtonsBlockNode);
    
  }

  dragAndDrop() {
    const state = JSON.parse(localStorage.getItem('state'));
    document.querySelectorAll('.main-page__main-block__string')[state.currentExample - 1].children.forEach(el => {
      el.setAttribute('draggable', 'true')
    })
    const words = document.querySelectorAll('.main-page__main-block__string__el');
    const cells = document.querySelectorAll('.main-page__result-block');
    let currentWord;
    const dragStart = function (evt) {
      currentWord = this;
      setTimeout(() => {
          this.classList.add('hide');
      }, 0);
      this.style.left = `0`
    };
    const dragEnd = function () {
      this.classList.remove('hide');
    
    };
  
    const dragOver = function (evt) {
      evt.preventDefault();
    };
  
    const dragDrop = function () {
      this.append(currentWord);
    };
    words.forEach(word => {
      word.addEventListener('dragstart', dragStart)
      word.addEventListener('dragend', dragEnd)
    })
  
    cells.forEach(cell => {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('drop', dragDrop);
    })
  
  }

  click() {
    const state = JSON.parse(localStorage.getItem('state'));
    const cell = document.querySelector('.main-page__result-block');
    console.log(cell)
    function foo() {
      cell.append(this)
    }
    const words = document.querySelectorAll('.main-page__main-block__string')[state.currentExample - 1].querySelectorAll('.main-page__main-block__string__el');
    words.forEach(word => {
      word.addEventListener('click', foo);
      word.style.cursor = 'pointer'
    })
  }

  
}


