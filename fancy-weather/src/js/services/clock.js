export default function tick() {
  const timeNode = document.querySelector('.weather__title__date__time');
  const time = timeNode.textContent;
  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);
  let s = Number(time.split(':')[2]);
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
  if (h > 23) {
    s = 0;
    m = 0;
    h = 1;
  }
  timeNode.innerHTML = `&nbsp${h.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`;
}
