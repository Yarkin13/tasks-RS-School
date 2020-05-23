const tick = (h, m, s, date) => {
  s += 1;
  if (s > 59) {
    s = 0;
    m += 1;
  }
  if (m > 59) {
    s = 0;
    m = 0;
    h += 1;
  }
  const time = `${dayInWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${h.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`;
  console.log(time);
  const timeNode = document.querySelector('.weather__title__date');
  timeNode.innerHTML = time;
  setTimeout(tick, 1000, h, m, s, date);
};
const tickClock = (time) => {
  const sec = Number(time[2]);
  const min = Number(time[1]);
  const hour = Number(time[0]);
  const date = time[3];
  tick(hour, min, sec, date);
};
