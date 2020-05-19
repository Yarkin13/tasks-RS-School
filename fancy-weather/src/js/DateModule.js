export const DateModule = (function(){
  const getDate = () => {
    const startDate = new Date;
    const dayInWeek = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (`${dayInWeek[startDate.getDay()]} ${startDate.getDate()} ${startDate.getHours().toString().padStart(2, 0)}:${startDate.getMinutes().toString().padStart(2, 0)}:${startDate.getSeconds().toString().padStart(2, 0)}`)
  }
  const renderDate = () => {
    document.querySelector('.weather__title-date').innerHTML = getDate()
  }
  return {
    renderDate
  }
})()