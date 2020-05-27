import mapboxgl from 'mapbox-gl';
import { getCurrentlyNameCity, getGeoData } from './services/geolocation-service';
import { getTranslateSearch } from './services/translate-service';

export default (function MapBoxModule() {
  const renderStructure = () => {
    const node = (
      `<div class="map-box">
        <div id="map" class="map-box__map"></div>
        <div class="map-box__coordinates"></div>
      </div>`
    );
    const targetNode = document.querySelector('.main-content-wrapper');
    targetNode.insertAdjacentHTML('beforeend', node);
  };
  const renderMap = (lng, lat) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoieWFya2luMTMiLCJhIjoiY2thZTJ4aHN1MGE5YTJ4bHBwM2t3eHc2biJ9.bJlr2hdfO8OuYP88VxDY0Q';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lat, lng],
      zoom: 10,
    });
    // need for map box
    /* eslint-disable no-unused-vars */
    const marker = new mapboxgl.Marker()
      .setLngLat([lat, lng])
      .addTo(map);
      /* eslint-disable no-unused-vars */
  };

  const renderCoordinate = (lng, lat) => {
    const targetNode = document.querySelector('.map-box__coordinates');
    const node = (
      `<p data-i18n="lng" class="map-box__coordinates__longitude">Longitude: ${lng}</p>
      <p data-i18n="lat"  class="map-box__coordinates__latitude">Latitude: ${lat}</p>`
    );
    targetNode.insertAdjacentHTML('beforeend', node);
  };
  const renderCurrentMap = async () => {
    renderStructure();
    const currentlyNameCity = await getCurrentlyNameCity();
    const geoData = await getGeoData(currentlyNameCity);
    renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    renderCoordinate(geoData.results[0].annotations.DMS.lng,
      geoData.results[0].annotations.DMS.lat);
  };
  const renderRequestedMap = async (searchValue) => {
    renderStructure();
    if (/[a-zA-Z]/.test(searchValue)) {
      const geoData = await getGeoData(searchValue);
      renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
      renderCoordinate(geoData.results[0].annotations.DMS.lng,
        geoData.results[0].annotations.DMS.lat);
    } else {
      const translate = await getTranslateSearch(searchValue);
      const geoData = await getGeoData(translate.text[0]);
      renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
      renderCoordinate(geoData.results[0].annotations.DMS.lng,
        geoData.results[0].annotations.DMS.lat);
    }
  };
  return {
    renderCurrentMap,
    renderRequestedMap,
  };
}());
