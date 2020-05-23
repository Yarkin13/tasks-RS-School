import mapboxgl from 'mapbox-gl';
import { getCurrentlyNameCity, getGeoData } from './services/geolocation-service';
import { getTranslate } from './services/translate-service';

export const MapBoxModule = (function () {
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
    const marker = new mapboxgl.Marker()
      .setLngLat([lat, lng])
      .addTo(map);
  };

  const renderCoordinate = (lng, lat) => {
    const targetNode = document.querySelector('.map-box__coordinates');
    const node = (
      `<p class="map-box__coordinates__longitude">Longitude: ${lng}</p>
      <p class="map-box__coordinates__latitude">Latitude: ${lat}</p>`
    );
    targetNode.insertAdjacentHTML('beforeend', node);
  };
  const renderCurrentMap = async () => {
    renderStructure();
    const currentlyNameCity = await getCurrentlyNameCity();
    const geoData = await getGeoData(currentlyNameCity);
    renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
    renderCoordinate(geoData.results[0].annotations.DMS.lng, geoData.results[0].annotations.DMS.lat);
  };
  const renderRequestedMap = async (searchValue) => {
    renderStructure();
    if (/[a-zA-Z]/.test(searchValue)) {
      const geoData = await getGeoData(searchValue);
      renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
      renderCoordinate(geoData.results[0].annotations.DMS.lng, geoData.results[0].annotations.DMS.lat);
    } else {
      const translate = await getTranslate(searchValue);
      const geoData = await getGeoData(translate.text[0]);
      renderMap(geoData.results[0].geometry.lat, geoData.results[0].geometry.lng);
      renderCoordinate(geoData.results[0].annotations.DMS.lng, geoData.results[0].annotations.DMS.lat);
    }
  };
  return {
    renderCurrentMap,
    renderRequestedMap,
  };
}());
