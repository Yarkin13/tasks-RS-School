import '../styles/style.css';
import {SearchModal} from './SearchModal.js'
import {WetherTodayModule} from './WetherTodayModule.js'
import {DateModule} from './DateModule.js'
SearchModal.render()

WetherTodayModule.getGeolocation()
  .then(data => WetherTodayModule.getWetherData(data.city, data.country))
  .then(data => WetherTodayModule.renderWetherData(data))
  .then(setInterval(DateModule.renderDate, 1000));
