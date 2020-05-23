import '../styles/style.css';
import { ControlBlockModule } from './ControlBlockModule';
import { WeatherTodayModule } from './WeatherTodayModule';
import { MapBoxModule } from './MapBoxModule';
import { BackgroundModule } from './BackgroundModule';

async function startApplication() {
  BackgroundModule.renderBackground();
  ControlBlockModule.render();
  MapBoxModule.renderCurrentMap();
  await WeatherTodayModule.renderCurrentWeather();
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state.unit === 'f') {
    ControlBlockModule.transformTemperatureC_F();
  }
}

startApplication();

const input = document.querySelector('.control-block__search-form__input');
const btn = document.querySelector('.control-block__search-form__btn');
const wrapper = document.querySelector('.main-content-wrapper');
const btnF = document.querySelector('.control-block__switche__btn-F');
const btnC = document.querySelector('.control-block__switche__btn-C');

btn.addEventListener('click', async (event) => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  wrapper.innerHTML = '';
  await WeatherTodayModule.renderRequestedWeather(input.value);
  await MapBoxModule.renderRequestedMap(input.value);
  if (state.unit === 'f') {
    ControlBlockModule.transformTemperatureC_F();
  }
});

btnF.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
    if(state.unit === 'f') return;
  ControlBlockModule.transformTemperatureC_F()
  btnC.classList.remove('active')
  btnF.classList.add('active');
})

btnC.addEventListener('click', () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
    if(state.unit === 'c') return;
  ControlBlockModule.transformTemperatureF_C()
  btnF.classList.remove('active')
  btnC.classList.add('active');
})

