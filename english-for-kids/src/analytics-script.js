const BURGER_BTN = document.getElementById('burger-checkbox');
const SPAN = document.querySelector('span');
const BURGER_MENU = document.querySelector('.burger-menu__menu');
const stateNow = JSON.parse(sessionStorage.getItem('stateNow'));
stateNow.mode = 'train';
BURGER_BTN.addEventListener('click', (event) => { // Menu
  if (event.target.dataset.indexNumber = '1') {
    SPAN.classList.toggle('burger-menu_active');
  }
  BURGER_MENU.classList.toggle('show-menu');
});
document.addEventListener('click', (event) => {
  if (event.target !== BURGER_BTN) BURGER_MENU.classList.remove('show-menu');
});
BURGER_MENU.querySelectorAll('a').forEach((el) => {
  if (el.text === stateNow.category) {
    el.classList.add('active');
  }
});
BURGER_MENU.addEventListener('click', (event) => {
  stateNow.category = event.target.innerHTML;
  sessionStorage.setItem('stateNow', JSON.stringify(stateNow));
});

const arrayAnalytics = JSON.parse(localStorage.getItem('arrayAnalytics')); // add percent in analytics array
arrayAnalytics.forEach((el) => {
  el.percent = Math.round((el.correctClick / (el.correctClick + el.incorrectClick)) * 100);
  if (el.correctClick === 0 && el.incorrectClick === 0) el.percent = 0;
  if (el.correctClick !== 0 && el.incorrectClick === 0) el.percent = 100;
});
const arrayHeading = ['Category', 'Word', 'Translate', 'Clicks in train', 'Correct click in exam',
  'Incorrect click in exam', '%']; 
const TABLE = document.createElement('table');
document.querySelector('.container').append(TABLE);
for (let i = 0; i <= 64; i += 1) { // draw table
  const TABLE_ROW = document.createElement('tr');
  TABLE.append(TABLE_ROW);
  if (i === 0) {
    let w = 0;
    for (let j = 0; j < 7; j += 1) {
      w += 1;
      const TABLE_HEADER = document.createElement('th');
      const SORT_CONTAINER_UP = document.createElement('div');
      const SORT_CONTAINER_DOWN = document.createElement('div');
      SORT_CONTAINER_UP.className = 'th__sort-up';
      SORT_CONTAINER_UP.id = `${w}`;
      w += 1;
      SORT_CONTAINER_DOWN.className = 'th__sort-down';
      SORT_CONTAINER_DOWN.id = `${w}`;
      TABLE_HEADER.innerText = arrayHeading[j];
      TABLE_HEADER.append(SORT_CONTAINER_UP);
      TABLE_HEADER.append(SORT_CONTAINER_DOWN);
      TABLE_ROW.append(TABLE_HEADER);
    }
  } else {
    for (let j = 0; j < 7; j += 1) {
      const TABLE_ITEM = document.createElement('td');
      if (j === 0) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].category;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 1) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].word;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 2) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].translate;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 3) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].clicksInTrain;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 4) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].correctClick;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 5) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].incorrectClick;
        TABLE_ROW.append(TABLE_ITEM);
      }
      if (j === 6) {
        TABLE_ITEM.innerText = arrayAnalytics[i - 1].percent;
        TABLE_ROW.append(TABLE_ITEM);
      }
    }
  }
}

let f = -1;
function sort(el) { 
  if (f === 64) f = -1;
  f += 1;
  if (f === 0) return;
  if (f === 65) return;
  for (let i = 0; i < 7; i += 1) {
    if (i === 0) el.cells[i].innerText = arrayAnalytics[f - 1].category;
    if (i === 1) el.cells[i].innerText = arrayAnalytics[f - 1].word;
    if (i === 2) el.cells[i].innerText = arrayAnalytics[f - 1].translate;
    if (i === 3) el.cells[i].innerText = arrayAnalytics[f - 1].clicksInTrain;
    if (i === 4) el.cells[i].innerText = arrayAnalytics[f - 1].correctClick;
    if (i === 5) el.cells[i].innerText = arrayAnalytics[f - 1].incorrectClick;
    if (i === 6) el.cells[i].innerText = arrayAnalytics[f - 1].percent;
  }
}

document.getElementById('1').addEventListener('click', () => { //sort
  arrayAnalytics.sort((prev, next) => {
    if (prev.category < next.category) return -1;
    if (prev.category < next.category) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('2').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => {
    if (next.category < prev.category) return -1;
    if (next.category < prev.category) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('3').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => {
    if (prev.word < next.word) return -1;
    if (prev.word < next.word) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('4').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => {
    if (next.word < prev.word) return -1;
    if (next.word < prev.word) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('5').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => {
    if (prev.translate < next.translate) return -1;
    if (prev.translate < next.translate) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('6').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => {
    if (next.translate < prev.translate) return -1;
    if (next.translate < prev.translate) return 1;
  });
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('7').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => next.clicksInTrain - prev.clicksInTrain);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('8').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => prev.clicksInTrain - next.clicksInTrain);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('9').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => next.correctClick - prev.correctClick);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('10').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => prev.correctClick - next.correctClick);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});


document.getElementById('11').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => next.incorrectClick - prev.incorrectClick);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('12').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => prev.incorrectClick - next.incorrectClick);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});


document.getElementById('13').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => next.percent - prev.percent);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});

document.getElementById('14').addEventListener('click', () => {
  arrayAnalytics.sort((prev, next) => prev.percent - next.percent);
  document.querySelectorAll('tr').forEach((el) => sort(el));
});
