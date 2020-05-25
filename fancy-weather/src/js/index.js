import '../styles/style.css';
import { ControlBlockModule } from './ControlBlockModule';
import { WeatherTodayModule } from './WeatherTodayModule';
import { MapBoxModule } from './MapBoxModule';
import { BackgroundModule } from './BackgroundModule';


async function startApplication() {
  BackgroundModule.renderBackground();
  ControlBlockModule.render();
  await MapBoxModule.renderCurrentMap();
  await WeatherTodayModule.renderCurrentWeather();
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state.unit === 'f') {
    ControlBlockModule.transformTemperature('f');
  }
  if (state.unit === 'c') {
    ControlBlockModule.transformTemperature('c');
  }
  if (state.lang === 'ru') {
    ControlBlockModule.translate('ru');
  }
  if (state.lang === 'en') {
    ControlBlockModule.translate('en');
  }
  if (state.lang === 'be') {
    ControlBlockModule.translate('be');
  }
}

startApplication();

const input = document.querySelector('.control-block__search-form__input');
const btn = document.querySelector('.control-block__search-form__btn');
const wrapper = document.querySelector('.main-content-wrapper');
const btnF = document.querySelector('.control-block__switche__btn-F');
const btnC = document.querySelector('.control-block__switche__btn-C');
const btnRU = document.querySelector('.control-block__switche__btn-RU');
const btnEN = document.querySelector('.control-block__switche__btn-EN');
const btnBE = document.querySelector('.control-block__switche__btn-BE');


btn.addEventListener('click', async (event) => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  wrapper.innerHTML = '';
  await WeatherTodayModule.renderRequestedWeather(input.value);
  await MapBoxModule.renderRequestedMap(input.value);
  if (state.unit === 'f') {
    ControlBlockModule.transformTemperature('f');
  }
  if (state.unit === 'c') {
    ControlBlockModule.transformTemperature('c');
  }
  if (state.lang === 'ru') {
    ControlBlockModule.translate('ru');
  }
  if (state.lang === 'en') {
    ControlBlockModule.translate('en');
  }
  if (state.lang === 'be') {
    ControlBlockModule.translate('be');
  }
});

btnF.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
    if(state.unit === 'f') return;
  ControlBlockModule.transformTemperature('f');
})

btnC.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
    if(state.unit === 'c') return;
  ControlBlockModule.transformTemperature('c');
})

btnRU.addEventListener('click', () => {
  ControlBlockModule.translate('ru');
})

btnEN.addEventListener('click', () => {
  ControlBlockModule.translate('en');
})

btnBE.addEventListener('click', () => {
  ControlBlockModule.translate('be');
})



