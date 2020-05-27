import { getCurrentlyNameCity, getGeoData } from './services/geolocation-service';
import { getOneDayWeatherData } from './services/weather-service';

export const BackgroundModule = (function () {
  const node = document.querySelector('.wrapper');
  const backgroundList = {
    spring: [['./assets/background/spring/spring-day-1', './assets/background/spring/spring-day-2', './assets/background/spring/spring-day-3',
      './assets/background/spring/spring-day-4', './assets/background/spring/spring-day-5', './assets/background/spring/spring-day-6',
      './assets/background/spring/spring-day-7'], ['./assets/background/spring/spring-night-1', './assets/background/spring/spring-night-2',
      './assets/background/spring/spring-night-3', './assets/background/spring/spring-night-4', './assets/background/spring/spring-night-5']],
    summer: [['./assets/background/summer/summer-day-1', './assets/background/summer/summer-day-2', './assets/background/summer/summer-day-3',
      './assets/background/summer/summer-day-4', './assets/background/summer/summer-day-5', './assets/background/summer/summer-day-6',
      './assets/background/summer/summer-day-7', './assets/background/summer/summer-day-8', './assets/background/summer/summer-day-9' ,
      './assets/background/summer/summer-day-10' ,'./assets/background/summer/summer-day-11' ,'./assets/background/summer/summer-day-12'],
    ['./assets/background/summer/summer-night-1', './assets/background/summer/summer-night-2',
      './assets/background/summer/summer-night-3', './assets/background/summer/summer-night-4', './assets/background/summer/summer-night-5',
      './assets/background/summer/summer-night-6', './assets/background/summer/summer-night-7', './assets/background/summer/summer-night-8',
      './assets/background/summer/summer-night-9']],
    autumn: [['./assets/background/autumn/autumn-day-1', './assets/background/autumn/autumn-day-2', './assets/background/autumn/autumn-day-3',
      './assets/background/autumn/autumn-day-4', './assets/background/autumn/autumn-day-5', './assets/background/autumn/autumn-day-6',
      './assets/background/autumn/autumn-day-7'],
    ['./assets/background/autumn/autumn-night-1', './assets/background/autumn/autumn-night-2', './assets/background/autumn/autumn-night-3']],
    winter: [['./assets/background/winter/winter-day-1', './assets/background/winter/winter-day-2', './assets/background/winter/winter-day-3',
      './assets/background/winter/winter-day-4', './assets/background/winter/winter-day-5', './assets/background/winter/winter-day-6',
      './assets/background/winter/winter-day-7'],
    ['./assets/background/winter/winter-night-1', './assets/background/winter/winter-night-2', './assets/background/winter/winter-night-3',
      './assets/background/winter/winter-night-4']],
  };
  const initBackgroundList = async () => {
    const state = JSON.parse(sessionStorage.getItem('state'));
    const input = document.querySelector('.control-block__search-form__input');
    let currentlyNameCity = await getCurrentlyNameCity();
    if (input.value !== '') {
      currentlyNameCity = state.request;
    }
    const geoData = await getGeoData(currentlyNameCity);
    const dataWeather = await getOneDayWeatherData(geoData.results[0].geometry.lat,
      geoData.results[0].geometry.lng);
    const date = dataWeather.data[0].timestamp_local;
    const month = date.split('-')[1];
    const hour = date.split('T')[1].split(':')[0];
    let targetBackgroundList;
    if ((month >= 0 && month <= 2) || month === '12') {
      if ((hour >= 0 && hour < 6) || hour >= 21) {
        console.log('winter night');
        targetBackgroundList = backgroundList.winter[1];
      } else {
        console.log('winter day');
        targetBackgroundList = backgroundList.winter[0];
      }
    }
    if ((month >= 3 && month <= 5)) {
      if ((hour >= 0 && hour < 6) || hour >= 21) {
        console.log('spring night');
        targetBackgroundList = backgroundList.spring[1];
      } else {
        console.log('spring day');
        targetBackgroundList = backgroundList.spring[0];
      }
    }
    if ((month >= 6 && month <= 8)) {
      if ((hour >= 0 && hour < 6) || hour >= 21) {
        console.log('summer night');
        targetBackgroundList = backgroundList.summer[1];
      } else {
        console.log('summer day');
        targetBackgroundList = backgroundList.summer[0];
      }
    }
    if ((month >= 9 && month <= 11)) {
      if ((hour >= 0 && hour < 6) || hour >= 21) {
        console.log('autumn night');
        targetBackgroundList = backgroundList.autumn[1];
      } else {
        console.log('autumn day');
        targetBackgroundList = backgroundList.autumn[0];
      }
    }
    return targetBackgroundList;
  };
  const rnd = listLength => Math.round(Math.random() * (listLength - 1));

  const renderBackground = async () => {
    const targetBackgroundList = await initBackgroundList();
    node.style.background = `url(${targetBackgroundList[rnd(targetBackgroundList.length)]}.jpg), linear-gradient(#303030, grey)`;
    node.style.backgroundAttachment = 'fixed';
    node.style.backgroundRepeat = 'no-repeat';
    node.style.backgroundPosition = 'center';
  };
  return {
    renderBackground,
  };
}());
