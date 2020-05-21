export const GeolocationModule = (function () {
  const getCity = async function () {
    const url = 'https://ipinfo.io/json?token=1ead1697d39f65';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data.city;
    
  };
  const getGeoData = async (city) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=b576905afb8a4ff09d96f510c6a71cae&pretty=1`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data;
  }

  return {
    getCity,
    getGeoData,
  }
}())