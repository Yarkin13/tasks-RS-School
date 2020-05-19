export const SearchModal = (function(){
  const form = document.querySelector('form')
  const renderSearchInput = () => {
    form.insertAdjacentHTML('beforeend', `<form><input class="control-block__search-form__input">
    <button class="control-block__search-form__btn">a</button></form>`);
  }
  const getWeatherModal = () => {
    getGeolocation();
  }
  const getGeolocation = async function () {
    const url = 'https://ipinfo.io/json?token=1ead1697d39f65';
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  return {
    render: renderSearchInput,
    getGeolocation,
  }
})()