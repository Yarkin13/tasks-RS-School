import '../styles/style.css';
import { ControlBlockModule } from './ControlBlockModule.js';
import { WeatherTodayModule } from './WeatherTodayModule.js';
import {MapBoxModule} from './MapBoxModule.js';
import {BackgroundModule} from './BackgroundModule.js';
import {GeolocationModule} from './GeolocationModule.js'

async function startApplication() {
  ControlBlockModule.render();
  MapBoxModule.renderStructure();
  BackgroundModule.renderBackground();
  const city = await GeolocationModule.getCity();
  const geoData = await GeolocationModule.getGeoData(city);
  const weatherData = await WeatherTodayModule.getWeatherData(geoData.results[0].components.city, geoData.results[0].components.country)
  MapBoxModule.renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
  MapBoxModule.renderCoordinate(geoData.results[0].annotations.DMS.lng, geoData.results[0].annotations.DMS.lat)
  WeatherTodayModule.renderWeatherData(weatherData);
  setInterval(WeatherTodayModule.updateDate, 1000,geoData.results[0].annotations.DMS.lng, geoData.results[0].annotations.DMS.lat)
}
startApplication()

const input = document.querySelector('.control-block__search-form__input')
const btn = document.querySelector('.control-block__search-form__btn')
btn.addEventListener('click', (event) => {
  console.log(event)
})


  

  
