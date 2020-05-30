import { getTranslateCity } from './services/translate-service';
import { translateDataRU, translateDataEN, translateDataBE } from './data/translate-data';

export default (function ControlBlockModule() {
  const targetNode = document.querySelector('.control-block');
  const node = (
    `<div class="control-block__switcher">
      <button class="control-block__switche__btn-update"> </button>
      <button class="control-block__switche__btn-RU">RU</button>
      <button class="control-block__switche__btn-EN">EN</button>
      <button class="control-block__switche__btn-BE">BE</button>
      <button class="control-block__switche__btn-C">C°</button>
      <button class="control-block__switche__btn-F">F°</button>
    </div>
    <div class="control-block__search-form">
        <input class="control-block__search-form__input">
        <button class ="control-block__search-form__mic">
          <img class ="control-block__search-form__mic__img" src="./assets/mic.svg">
        </button>
        <button data-i18n ="search" class="control-block__search-form__btn">Search</button>
    </div>`);

  const transformTemperature = (targetUnit) => {
    const state = JSON.parse(sessionStorage.getItem('state'));
    const mainTempNode = document.querySelector('.weather__description__temperature');
    const TempOneDayNode = document.querySelector('.weather__three-days-weather__one-day__temp1');
    const TempTwoDayNode = document.querySelector('.weather__three-days-weather__one-day__temp2');
    const TempThreeDayNode = document.querySelector('.weather__three-days-weather__one-day__temp3');
    const btnF = document.querySelector('.control-block__switche__btn-F');
    const btnC = document.querySelector('.control-block__switche__btn-C');
    const fellsLikeTemp = document.querySelector('.weather__description__summary__feels-like__temp');
    const arrayBefore = [mainTempNode.innerText, TempOneDayNode.innerText,
      TempTwoDayNode.innerText, TempThreeDayNode.innerText, fellsLikeTemp.innerText];
    let arrayAfter;
    if (targetUnit === 'f') {
      arrayAfter = arrayBefore.map(el => Math.round(Number(el.substring(0, el.length - 1))
      * 1.8 + 32));
      btnC.classList.remove('active');
      btnF.classList.add('active');
    }
    if (targetUnit === 'c') {
      arrayAfter = arrayBefore.map(el => Math.round((Number(el.substring(0, el.length - 1)) - 32)
      / 1.8));
      btnF.classList.remove('active');
      btnC.classList.add('active');
    }

    mainTempNode.innerText = `${arrayAfter[0]}°`;
    TempOneDayNode.innerText = `${arrayAfter[1]}°`;
    TempTwoDayNode.innerText = `${arrayAfter[2]}°`;
    TempThreeDayNode.innerText = `${arrayAfter[3]}°`;
    fellsLikeTemp.innerHTML = `&nbsp${arrayAfter[4]}°`;
    state.unit = targetUnit;
    sessionStorage.setItem('state', JSON.stringify(state));
  };

  const renderControlBlock = () => {
    targetNode.insertAdjacentHTML('beforeend', node);
    if (typeof sessionStorage.state === 'undefined') {
      const state = {
        unit: 'c',
        lang: 'en',
        date: '',
        request: 'samara',
      };
      sessionStorage.setItem('state', JSON.stringify(state));
    }
  };

  const translate = async (targetLang) => {
    const btnRU = document.querySelector('.control-block__switche__btn-RU');
    const btnEN = document.querySelector('.control-block__switche__btn-EN');
    const btnBE = document.querySelector('.control-block__switche__btn-BE');
    const cityNode = document.querySelector('.weather__title__city');
    const translateCity = await getTranslateCity(cityNode.textContent, targetLang);
    // did not understand how to destruct
    /* eslint-disable prefer-destructuring */
    cityNode.textContent = translateCity.text[0];
    /* eslint-disable prefer-destructuring */
    const date = new Date(JSON.parse(sessionStorage.getItem('state')).date);
    const nodes = document.querySelectorAll('[data-i18n]');
    const state = JSON.parse(sessionStorage.getItem('state'));
    state.lang = targetLang;
    sessionStorage.setItem('state', JSON.stringify(state));
    let translateData;
    switch (state.lang) {
      case 'ru':
        translateData = translateDataRU;
        btnRU.classList.add('active');
        btnEN.classList.remove('active');
        btnBE.classList.remove('active');
        break;
      case 'en':
        translateData = translateDataEN;
        btnEN.classList.add('active');
        btnRU.classList.remove('active');
        btnBE.classList.remove('active');
        break;
      case 'be':
        translateData = translateDataBE;
        btnBE.classList.add('active');
        btnRU.classList.remove('active');
        btnEN.classList.remove('active');
        break;
      default:
        return;
    }
    /* eslint-disable no-param-reassign */
    // could not fix
    nodes.forEach((el) => {
      switch (el.className) {
        case 'weather__description__summary__wind':
          el.textContent = `${translateData[el.dataset.i18n]}:${el.textContent.split(':')[1].split(' ')[0]} ${translateData.ms}`;
          break;
        case 'error-msg':
          el.textContent = translateData[el.dataset.i18n];
          break;
        case 'weather__title__date__date':
          el.textContent = `${translateData.days[date.getDay()]} ${date.getDate()} ${translateData.months[date.getMonth()]}`;
          break;
        case 'weather__three-days-weather__one-day__name-day1':
          el.textContent = translateData.days[date.getDay() + 1];
          break;
        case 'weather__three-days-weather__one-day__name-day2':
          el.textContent = translateData.days[date.getDay() + 2];
          break;
        case 'weather__three-days-weather__one-day__name-day3':
          el.textContent = translateData.days[date.getDay() + 3];
          break;
        case 'control-block__search-form__btn':
          el.textContent = translateData[el.dataset.i18n];
          break;
        case 'weather__description__summary__description':
          el.textContent = translateData[el.dataset.i18n];
          break;
        case 'weather__description__summary__feels-like__text':
          el.textContent = translateData[el.dataset.i18n];
          break;
        default:
          el.textContent = `${translateData[el.dataset.i18n]}:${el.textContent.split(':')[1]}`;
          /* eslint-disable no-param-reassign */
      }
    });
  };

  /* eslint-disable new-cap */
  /* eslint-disable no-undef */
  // why does he swear on built-in classes?
  const speech = (innerLang) => {
    const input = document.querySelector('.control-block__search-form__input');
    const btnSearch = document.querySelector('.control-block__search-form__btn');
    const recognition = new webkitSpeechRecognition();
    recognition.lang = innerLang;
    recognition.start();
    recognition.onresult = (event) => {
      input.value = event.results[0][0].transcript;
      btnSearch.click();
    };
  };
  /* eslint-disable new-cap */
  /* eslint-disable no-undef */

  return {
    render: renderControlBlock,
    transformTemperature,
    translate,
    speech,

  };
}());
