export async function getOneDayWeatherData(lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${lat}&lon=${lon}&key=b35f20a094624b15aa851a45290ae009&hours=48`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getThreeDayWeatherData(lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&days=16&units=M&lang=EN&key=b35f20a094624b15aa851a45290ae009`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
