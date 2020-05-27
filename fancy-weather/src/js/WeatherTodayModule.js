import { getCurrentlyNameCity, getGeoData, getAndTransformDateUTC0 } from './services/geolocation-service';
import { getOneDayWeatherData, getThreeDayWeatherData } from './services/weather-service';
import { getTranslateSearch } from './services/translate-service';

export default (function WeatherTodayModule() {
  const dayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  async function getCurrentWeatherData() {
    const input = document.querySelector('.control-block__search-form__input');
    let currentlyNameCity = await getCurrentlyNameCity();
    if (input.value !== '') {
      currentlyNameCity = input.value;
    }
    const geoData = await getGeoData(currentlyNameCity);
    const time = await getAndTransformDateUTC0(currentlyNameCity,
      geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const data = await getOneDayWeatherData(geoData.results[0].geometry.lat,
      geoData.results[0].geometry.lng);
    const data2 = await getThreeDayWeatherData(geoData.results[0].geometry.lat,
      geoData.results[0].geometry.lng);
    const weatherInfo = {
      city: geoData.results[0].formatted,
      date: time,
      code: data.data[0].weather.code,
      temp: Math.round(data.data[0].temp),
      description: data.data[0].weather.description,
      feelsLike: Math.round(data.data[0].app_temp),
      wind: Math.round(data.data[0].wind_spd),
      humidity: data.data[0].rh,
      icon: data.data[0].weather.icon,
      threeDay: [
        {
          temp: Math.round(data2.data[1].temp),
          icon: data2.data[1].weather.icon,
        },
        {
          temp: Math.round(data2.data[2].temp),
          icon: data2.data[2].weather.icon,
        },
        {
          temp: Math.round(data2.data[3].temp),
          icon: data2.data[3].weather.icon,
        },
      ],
    };
    return weatherInfo;
  }

  const renderWeatherData = async (weatherInfo) => {
    const targetNode = document.querySelector('.main-content-wrapper');
    const weatherNode = (
      `<div class="weather">
      <div class="weather__title">
        <p class="weather__title__city">${weatherInfo.city}</p>
        <div class="weather__title__date">
          <p data-i18n="date" class="weather__title__date__date">${dayInWeek[weatherInfo.date.getDay()]} ${weatherInfo.date.getDate()} ${months[weatherInfo.date.getMonth()]}</p>
          <p class="weather__title__date__time">&nbsp${weatherInfo.date.getHours().toString().padStart(2, 0)}:${weatherInfo.date.getMinutes().toString().padStart(2, 0)}:${weatherInfo.date.getSeconds().toString().padStart(2, 0)}</p>
        </div>
      </div>
      <div class="weather__description">
        <div class="weather__description__temperature">${weatherInfo.temp}°</div>
        <div class="weather__description__summary">
          <img src="./assets/icons/${weatherInfo.icon}.png" class="weather__description__summary__img">
          <p data-i18n="${weatherInfo.code}" class="weather__description__summary__description">${weatherInfo.description}</p>
          <div class="weather__description__summary__feels-like">
            <p data-i18n="fells" class="weather__description__summary__feels-like__text">Fells like:</p>
            <p class="weather__description__summary__feels-like__temp">&nbsp${weatherInfo.feelsLike}°</p>
          </div>
          <p data-i18n="wind" class="weather__description__summary__wind">Wind:&nbsp${weatherInfo.wind} m/s</p>
          <p data-i18n="hum" class="weather__description__summary__hum">Humidity:&nbsp${weatherInfo.humidity}%</p>
        </div>
      </div>
      <div class="weather__three-days-weather">
        <div class="weather__three-days-weather__one-day">
          <div data-i18n="date1" class="weather__three-days-weather__one-day__name-day1">${dayInWeek[weatherInfo.date.getDay() + 1]}</div>
          <div class="weather__three-days-weather__one-day__temp1">${weatherInfo.threeDay[0].temp}°</div>
          <img style="position: relative; z-index: 10000;" src="./assets/icons/${weatherInfo.threeDay[0].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div data-i18n="date2" class="weather__three-days-weather__one-day__name-day2">${dayInWeek[weatherInfo.date.getDay() + 2]}</div>
          <div class="weather__three-days-weather__one-day__temp2">${weatherInfo.threeDay[1].temp}°</div>
          <img style="position: relative; z-index: 10000;" src="./assets/icons/${weatherInfo.threeDay[1].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div data-i18n="date3" class="weather__three-days-weather__one-day__name-day3">${dayInWeek[weatherInfo.date.getDay() + 3]}</div>
          <div class="weather__three-days-weather__one-day__temp3">${weatherInfo.threeDay[2].temp}°</div>
          <img style="position: relative; z-index: 10000;" src="./assets/icons/${weatherInfo.threeDay[2].icon}.png">
        </div>
      </div>
    </div>`);
    targetNode.insertAdjacentHTML('afterbegin', weatherNode);
  };

  const renderCurrentWeather = async () => {
    const weatherInfo = await getCurrentWeatherData();
    await renderWeatherData(weatherInfo);
  };

  const renderRequestedWeather = async (searchValue) => {
    if (/[a-zA-Z]/.test(searchValue)) {
      const weatherInfo = await getCurrentWeatherData(searchValue);
      await renderWeatherData(weatherInfo);
    } else {
      const translate = await getTranslateSearch(searchValue);
      const weatherInfo = await getCurrentWeatherData(translate.text[0]);
      await renderWeatherData(weatherInfo);
    }
  };

  return {
    renderCurrentWeather,
    renderRequestedWeather,
  };
}());
