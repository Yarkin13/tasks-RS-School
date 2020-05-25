export async function getTranslateSearch(str) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getTranslateCity(str, targetLang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=${targetLang}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

/* const transformTemperatureC_F = () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  const mainTempNode = document.querySelector('.weather__description__temperature');
  const TempOneDayNode = document.querySelector('.weather__three-days-weather__one-day__temp1');
  const TempTwoDayNode = document.querySelector('.weather__three-days-weather__one-day__temp2');
  const TempThreeDayNode = document.querySelector('.weather__three-days-weather__one-day__temp3');
  const arrayC = [mainTempNode.innerText, TempOneDayNode.innerText, TempTwoDayNode.innerText, TempThreeDayNode.innerText];
  const arrayF = arrayC.map(el => {
    el = Math.round(Number(el.substring(0, el.length - 1))* 1.8 + 32);
    return el;
  })
  mainTempNode.innerText = `${arrayF[0]}°`;
  TempOneDayNode.innerText = `${arrayF[1]}°`
  TempTwoDayNode.innerText = `${arrayF[2]}°`
  TempThreeDayNode.innerText = `${arrayF[3]}°`
  state.unit = 'f';
  sessionStorage.setItem('state', JSON.stringify(state));
}

const transformTemperatureF_C = () => {
  const state = JSON.parse(sessionStorage.getItem('state'));
  const mainTempNode = document.querySelector('.weather__description__temperature');
  const TempOneDayNode = document.querySelector('.weather__three-days-weather__one-day__temp1');
  const TempTwoDayNode = document.querySelector('.weather__three-days-weather__one-day__temp2');
  const TempThreeDayNode = document.querySelector('.weather__three-days-weather__one-day__temp3');
  const arrayF = [mainTempNode.innerText, TempOneDayNode.innerText, TempTwoDayNode.innerText, TempThreeDayNode.innerText];
  const arrayC = arrayF.map(el => {
    el = Math.round((Number(el.substring(0, el.length - 1))-32)/1.8);
    return el;
  }
  )
  mainTempNode.innerText = `${arrayC[0]}°`;
  TempOneDayNode.innerText = `${arrayC[1]}°`
  TempTwoDayNode.innerText = `${arrayC[2]}°`
  TempThreeDayNode.innerText = `${arrayC[3]}°`
  state.unit = 'c';
  sessionStorage.setItem('state', JSON.stringify(state));
} */