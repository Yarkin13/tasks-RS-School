export async function getCurrentlyNameCity() {
  const url = 'https://ipinfo.io/json?token=1ead1697d39f65';
  const res = await fetch(url);
  const data = await res.json();
  return data.city;
}
export async function getGeoData(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=b576905afb8a4ff09d96f510c6a71cae&pretty=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getDate(lat, lng) {
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=FC2V1LDYIW96&format=json&by=position&lat=${lat}&lng=${lng}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getAndTransformDatefromUTC0(city) {
  const geoData = await getGeoData(city);
  const UTC = Number(geoData.results[0].annotations.timezone.offset_sec);
  const date = new Date();
  const dateUTC = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getUTCHours(), date.getMinutes(), date.getSeconds());
  dateUTC.setSeconds(dateUTC.getSeconds() + UTC);
  const strDate = String(dateUTC);

  const state = JSON.parse(sessionStorage.getItem('state'));
  state.date = dateUTC;
  sessionStorage.setItem('state', JSON.stringify(state));
  return dateUTC;
}
