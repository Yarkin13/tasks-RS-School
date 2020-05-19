export const WetherTodayModule = (function() {
  const targetNode = document.querySelector('.main-content-wrapper')
  const getGeolocation = async function () {
    const url = 'https://ipinfo.io/json?token=1ead1697d39f65';
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const getWetherData = async function (city, country) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=16&units=S&lang=EN&key=b35f20a094624b15aa851a45290ae009`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const weatherInfo = {
      city : data.city_name,
      country : data.country_code,
      temp : Math.round(data.data[0].temp-273),
      description :data.data[0].weather.description,
      feelsLike : Math.round((data.data[0].app_max_temp-273+data.data[0].app_min_temp-273)/2),
      wind : Math.round(data.data[0].wind_spd),
      humidity : data.data[0].rh,
      icon : data.data[0].weather.icon
    }
    return weatherInfo;
  }

  const renderWetherData = (weatherInfo) => {
    
    const weatherNode = (
    `<div class="weather">
      <div class="weather__title">
        <p>${weatherInfo.city}, ${weatherInfo.country}</p>
        <p class="weather__title-date"></p>
      </div>
      <div class="weather__description">
        <div class="weather__description__temperature">${weatherInfo.temp}°</div>
        <div class="weather__description__summary">
          <img src="./assets/icons/${weatherInfo.icon}.png">
          <p>${weatherInfo.description}</p>
          <p>Fells like:&nbsp${weatherInfo.feelsLike}</p>
          <p>Wind:&nbsp${weatherInfo.wind} m/s</p>
          <p>Humidity:&nbsp${weatherInfo.humidity}%</p>
        </div>
      </div>
      <div class="weather__three-days-weather">
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp"></div>
          <img>
        </div>
      </div>
      <div class="weather__three-days-weather">
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp"></div>
          <img>
        </div>
      </div>
      <div class="weather__three-days-weather">
        <div class="weather__three-days-weather__one-day">
          <div class="weather__three-days-weather__one-day__name-day"></div>
          <div class="weather__three-days-weather__one-day__temp"></div>
          <img>
        </div>
      </div>
    </div>`)
    targetNode.insertAdjacentHTML('beforeend', weatherNode)
  }
  
  return {
    getWetherData,
    getGeolocation,
    renderWetherData
  }
})()