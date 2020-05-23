export const ControlBlockModule = (function () {
  const state = JSON.parse(sessionStorage.getItem('state'));
  const targetNode = document.querySelector('.control-block');
  const node = (
    `<div class="control-block__switcher">
      <button class="control-block__switche__btn-update"> </button>
      <button class="control-block__switche__btn-RU">RU</button>
      <button class="control-block__switche__btn-EN">EN</button>
      <button class="control-block__switche__btn-BE">BE</button>
      <button class="control-block__switche__btn-C active">C°</button>
      <button class="control-block__switche__btn-F">F°</button>
    </div>
    <div class="control-block__search-form">
        <input class="control-block__search-form__input">
        <button class="control-block__search-form__btn">Search</button>
    </div>`);

  const transformTemperatureC_F = () => {
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
  }
  
  const renderControlBlock = () => {
    targetNode.insertAdjacentHTML('beforeend', node);
    if(typeof sessionStorage.state == 'undefined') {
      document.querySelector('.control-block__switche__btn-C').classList.add('active');
      const state = {
        unit: 'c'
      };
      sessionStorage.setItem('state', JSON.stringify(state));
      return;
    } 
    const state = JSON.parse(sessionStorage.getItem('state'));
    if(state.unit === 'c') {
      document.querySelector('.control-block__switche__btn-C').classList.add('active')
    } else {
      document.querySelector('.control-block__switche__btn-C').classList.remove('active')
      document.querySelector('.control-block__switche__btn-F').classList.add('active')
    }
     
  };

  return {
    render: renderControlBlock,
    transformTemperatureC_F,
    transformTemperatureF_C
  };
}());
