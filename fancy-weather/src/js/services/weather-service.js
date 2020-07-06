export async function getOneDayWeatherData(lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${lat}&lon=${lon}&units=M&lang=EN&key=c8e43f620d1241c6b4571e34e8707069&hours=48`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getThreeDayWeatherData(lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=16&units=M&lang=EN&key=c8e43f620d1241c6b4571e34e8707069`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
