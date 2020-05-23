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
  console.log(data)
  return data;
}

export async function getDate(lat, lng) {
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=FC2V1LDYIW96&format=json&by=position&lat=${lat}&lng=${lng}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
