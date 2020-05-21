export const WeatherTodayModule = (function () {
  const targetNode = document.querySelector('.main-content-wrapper');
  const dayInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December',]

  const getWeatherData = async function (city, country) {
    const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&country=${country}&key=b35f20a094624b15aa851a45290ae009&hours=48`
    const url2 = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=16&units=M&lang=EN&key=b35f20a094624b15aa851a45290ae009`;
    const res = await fetch(url);
    const res2 = await fetch(url2);
    const data = await res.json();
    const data2 = await res2.json();
    const weatherInfo = {
      city: city,
      country: country,
      temp: Math.round(data.data[0].temp),
      description: data.data[0].weather.description,
      feelsLike: Math.round(data.data[0].app_temp),
      wind: Math.round(data.data[0].wind_spd),
      humidity: data.data[0].rh,
      icon: data.data[0].weather.icon,
      threeDay:[
        {
          temp: Math.round(data2.data[1].temp),
          icon:data2.data[1].weather.icon
        },
        {
          temp: Math.round(data2.data[2].temp),
          icon:data2.data[2].weather.icon
        },
        {
          temp: Math.round(data2.data[3].temp),
          icon:data2.data[3].weather.icon
        }
      ]
    };
    return weatherInfo;
  };

  const getDate = async (lng, lat) => {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=FC2V1LDYIW96&format=json&by=position&lat=${lat}&lng=${lng}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data.formatted;
  }

  const transformDate = async (date) => {
    const time = date.split(' ')[1];
    const dateFormatted = date.split(' ')[0].split('-');
    const year = Number(dateFormatted[0]);
    const month = Number(dateFormatted[1]);
    const day = Number(dateFormatted[2]);
    const newDate = new Date(year, month-1, day);
    return [time, newDate]
  }

  const renderDate = async (date) => {
    const targetNode = document.querySelector('.weather__title__date');
    targetNode.innerHTML = `${dayInWeek[date[1].getDay()]} ${date[1].getDate()} ${months[date[1].getMonth()]} ${date[0]}`;
    document.querySelectorAll('.weather__three-days-weather__one-day__name-day').forEach((el, index) => {
      el.innerText = dayInWeek[date[1].getDay()+1+index]
  })
}

  const updateDate = async (lng, lat) => {
    const date = await WeatherTodayModule.getDate(lng, lat);
    const transformDate = await WeatherTodayModule.transformDate(date);
    WeatherTodayModule.renderDate(transformDate);
  }

  const renderWeatherData = (weatherInfo) => {
    const weatherNode = (
      `<div class="weather">
      <div class="weather__title">
        <p class="weather__title__city">${weatherInfo.city}, ${weatherInfo.country}</p>
        <p class="weather__title__date"></p>
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
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp">${weatherInfo.threeDay[0].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[0].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp">${weatherInfo.threeDay[1].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[1].icon}.png">
        </div>
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp">${weatherInfo.threeDay[2].temp}°</div>
          <img src="./assets/icons/${weatherInfo.threeDay[2].icon}.png">
        </div>
      </div>
    </div>`);
    targetNode.insertAdjacentHTML('afterbegin', weatherNode);
  };

  return {
    getWeatherData,
    renderWeatherData,
    renderDate,
    getDate,
    transformDate,
    updateDate
  };
}());
