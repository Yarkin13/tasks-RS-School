import '../styles/style.css';
import ControlBlockModule from './ControlBlockModule';
import WeatherTodayModule from './WeatherTodayModule';
import MapBoxModule from './MapBoxModule';
import BackgroundModule from './BackgroundModule';
import errorHandler from './services/error-handler';
import tick from './services/clock';

const weatherContent = document.querySelector('.main-content-wrapper');
const body = document.querySelector('body');

async function startApplication() {
  body.style.display = 'none';
  ControlBlockModule.render();
  await BackgroundModule.renderBackground();
  body.style.display = 'block';
  await MapBoxModule.renderCurrentMap();
  await WeatherTodayModule.renderCurrentWeather();
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state.unit === 'f') {
    ControlBlockModule.transformTemperature(state.unit);
  }
  if (state.unit === 'c') {
    document.querySelector('.control-block__switche__btn-C').classList.add('active');
  }
  await ControlBlockModule.translate(state.lang);
  weatherContent.classList.remove('hide');
  weatherContent.classList.add('show');
  const date = new Date(JSON.parse(sessionStorage.getItem('state')).date);
  const tickId = setInterval(() => tick(date), 1000);
  document.querySelector('.control-block__search-form__btn').addEventListener('click', () => {
    clearInterval(tickId);
  });
}

startApplication();

const input = document.querySelector('.control-block__search-form__input');
const btnSearch = document.querySelector('.control-block__search-form__btn');
const btnF = document.querySelector('.control-block__switche__btn-F');
const btnC = document.querySelector('.control-block__switche__btn-C');
const btnRU = document.querySelector('.control-block__switche__btn-RU');
const btnEN = document.querySelector('.control-block__switche__btn-EN');
const btnBE = document.querySelector('.control-block__switche__btn-BE');
const btnUpdate = document.querySelector('.control-block__switche__btn-update');
const btnVoice = document.querySelector('.control-block__search-form__mic');


btnSearch.addEventListener('click', async () => {
  try {
    if (input.value === '') return;
    const date = new Date(JSON.parse(sessionStorage.getItem('state')).date);
    const state = JSON.parse(sessionStorage.getItem('state'));
    state.request = input.value;
    sessionStorage.setItem('state', JSON.stringify(state));
    await BackgroundModule.renderBackground();
    weatherContent.classList.remove('show');
    weatherContent.classList.add('hide');
    weatherContent.innerHTML = '';
    await WeatherTodayModule.renderRequestedWeather(input.value);
    await MapBoxModule.renderRequestedMap(input.value);
    if (state.unit === 'f') {
      ControlBlockModule.transformTemperature(state.unit);
    }
    if (state.unit === 'c') {
      btnC.classList.add('active');
    }
    await ControlBlockModule.translate(state.lang);
    weatherContent.classList.remove('hide');
    weatherContent.classList.add('show');
    const tickId = setInterval(() => tick(date), 1000);
    btnSearch.addEventListener('click', () => {
      clearInterval(tickId);
    });
  } catch (error) {
    errorHandler();
    const date = new Date(JSON.parse(sessionStorage.getItem('state')).date);
    const tickId = setInterval(() => tick(date), 1000);
    btnSearch.addEventListener('click', () => {
      clearInterval(tickId);
    });
  }
});


btnF.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state.unit === 'f') return;
  ControlBlockModule.transformTemperature('f');
});

btnC.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state.unit === 'c') return;
  ControlBlockModule.transformTemperature('c');
});

btnRU.addEventListener('click', () => {
  ControlBlockModule.translate('ru');
});

btnEN.addEventListener('click', () => {
  ControlBlockModule.translate('en');
});

btnBE.addEventListener('click', () => {
  ControlBlockModule.translate('be');
});

btnUpdate.addEventListener('click', () => {
  BackgroundModule.renderBackground();
});

btnVoice.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  ControlBlockModule.speech(state.lang);
});
