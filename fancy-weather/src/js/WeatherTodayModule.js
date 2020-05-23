import { getCurrentlyNameCity, getGeoData, getDate } from './services/geolocation-service';
import { getOneDayWeatherData, getThreeDayWeatherData } from './services/weather-service';
import { getTranslate } from './services/translate-service';

export const WeatherTodayModule = (function () {
  const dayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const transformDate = async (date) => {
    const date1 = date.formatted.split(' ')[0];
    const year = date1.split('-')[0];
    const month = date1.split('-')[1];
    const day = date1.split('-')[2];
    const time = date.formatted.split(' ')[1];
    const hour = time.split(':')[0];
    const min = time.split(':')[1];
    const sec = time.split(':')[2];
    const newDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min), Number(sec));
    return [hour, min, sec, newDate];
  };
  const getCurrentWeatherData = async function () {
    const currentlyNameCity = await getCurrentlyNameCity();
    const geoData = await getGeoData(currentlyNameCity);
    const date = await getDate(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const time = await transformDate(date);
    const data = await getOneDayWeatherData(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const data2 = await getThreeDayWeatherData(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const weatherInfo = {
      city: geoData.results[0].formatted,
      date: time[3],
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
  };

  const getRequestedWeatherDate = async (searchValue) => {
    const geoData = await getGeoData(searchValue);
    const date = await getDate(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const time = await transformDate(date);
    const data = await getOneDayWeatherData(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const data2 = await getThreeDayWeatherData(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    const weatherInfo = {
      city: geoData.results[0].formatted,
      date: time[3],
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
  };

  const renderWeatherData = async (weatherInfo) => {
    const targetNode = document.querySelector('.main-content-wrapper');
    const weatherNode = (
      `<div class="weather">
      <div class="weather__title">
        <p class="weather__title__city">${weatherInfo.city}</p>
        <p class="weather__title__date">${dayInWeek[weatherInfo.date.getDay()]}, ${weatherInfo.date.getDate()} ${months[weatherInfo.date.getMonth()]} ${weatherInfo.date.getHours().toString().padStart(2, 0)}:${weatherInfo.date.getMinutes().toString().padStart(2, 0)}:${weatherInfo.date.getSeconds().toString().padStart(2, 0)}</p>
      </div>
      <div class="weather__description">
        <div class="weather__description__temperature">${weatherInfo.temp}°</div>
        <div class="weather__description__summary">
          <img src="./assets/icons/${weatherInfo.icon}.png" class="weather__description__summary__img">
          <p class="weather__description__summary__description">${weatherInfo.description}</p>
          <p class="weather__description__summary__feels-like">Fells like:&nbsp${weatherInfo.feelsLike}°</p>
          <p class="weather__description__summary__wind">Wind:&nbsp${weatherInfo.wind} m/s</p>
          <p class="weather__description__summary__hum">Humidity:&nbsp${weatherInfo.humidity}%</p>
        </div>
      </div>
      <div class="weather__three-days-weather">
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day">${dayInWeek[weatherInfo.date.getDay() + 1]}</div>
          <div class="weather__three-days-weather__one-day__temp1">${weatherInfo.threeDay[0].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[0].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day">${dayInWeek[weatherInfo.date.getDay() + 2]}</div>
          <div class="weather__three-days-weather__one-day__temp2">${weatherInfo.threeDay[1].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[1].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day">${dayInWeek[weatherInfo.date.getDay() + 3]}</div>
          <div class="weather__three-days-weather__one-day__temp3">${weatherInfo.threeDay[2].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[2].icon}.png">
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
      const weatherInfo = await getRequestedWeatherDate(searchValue);
      await renderWeatherData(weatherInfo);
    } else {
      const translate = await getTranslate(searchValue);
      const weatherInfo = await getRequestedWeatherDate(translate.text[0]);
      await renderWeatherData(weatherInfo);
    }
  };

  return {
    renderCurrentWeather,
    renderRequestedWeather,
  };
}());
