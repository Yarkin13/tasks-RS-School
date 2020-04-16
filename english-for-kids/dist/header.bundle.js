/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/header-script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/header-script.js":
/*!******************************!*\
  !*** ./src/header-script.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst BURGER_BTN = document.getElementById('burger-checkbox');\nconst MODE = document.getElementById('mode');\nconst SPAN = document.querySelector('span');\nconst BURGER_MENU = document.querySelector('.burger-menu__menu');\nconst SWITCH_MODE = document.getElementById('switch-mode');\nconst SWITCH_MODE_LABEL = document.querySelector('.switch-mode__for');\nconst CARDS_CONTAINER = document.querySelector('.container-cards');\nconst CARD_LIST = document.querySelectorAll('.container-card__items');\nconst START_BTN = document.querySelector('.game-options-start');\nconst REPEAT_BTN = document.getElementById('repeat');\nlet stateNow = { // объект текущего состояния\n  category: 'Main page',\n  mode: 'train',\n  currentCard: '',\n};\n\nBURGER_BTN.addEventListener('click', (event) => { // меню\n  const { target } = event;\n  if (target.tagName === 'SPAN' || target.tagName === 'INPUT') {\n    if (SPAN.classList.contains('burger-menu_active')) {\n      SPAN.classList.remove('burger-menu_active');\n    } else SPAN.classList.add('burger-menu_active');\n  }\n  if (BURGER_MENU.classList.contains('show-menu')) {\n    BURGER_MENU.classList.remove('show-menu');\n  } else {\n    BURGER_MENU.classList.add('show-menu');\n  }\n});\ndocument.addEventListener('click', (event) => {\n  if (event.target !== BURGER_BTN) BURGER_MENU.classList.remove('show-menu');\n});\n\nSWITCH_MODE.addEventListener('click', (event) => { // переключатель\n  if (event.target.checked === true) {\n    CARD_LIST.forEach((el) => el.classList.add('container-card__items_mode-play'));\n    BURGER_MENU.classList.add('burger-menu__menu_mode-play');\n    SWITCH_MODE_LABEL.classList.add('switch-mode__for_mode-play');\n    SWITCH_MODE_LABEL.innerHTML = 'Exam';\n    stateNow.mode = 'exam'; // фиксируем состояние\n    if (stateNow.category !== 'Main page' && stateNow.category !== '') { // работает только для страницы с карточками\n      CARDS_CONTAINER.querySelectorAll('img').forEach((el) => el.classList.add('container-card__items__img_exam'));\n      START_BTN.classList.add('show');\n      START_BTN.classList.remove('delete');\n    }\n  } else {\n    CARD_LIST.forEach((el) => el.classList.remove('container-card__items_mode-play'));\n    BURGER_MENU.classList.remove('burger-menu__menu_mode-play');\n    SWITCH_MODE_LABEL.classList.remove('switch-mode__for_mode-play');\n    SWITCH_MODE_LABEL.innerHTML = 'Train';\n    stateNow.mode = 'train';\n    if (stateNow.category !== 'Main page' && stateNow.category !== '') {\n      const ERROR_STARS = document.querySelectorAll('.star-error');\n      const STARS = document.querySelectorAll('.star');\n      CARDS_CONTAINER.querySelectorAll('img').forEach((el) => el.classList.remove('container-card__items__img_exam'));\n      START_BTN.classList.remove('show');\n      REPEAT_BTN.classList.remove('show'); // убираем производство от exam\n      ERROR_STARS.forEach((el) => el.remove());\n      STARS.forEach((el) => el.remove());\n      document.querySelectorAll('img').forEach((el) => el.classList.remove('inactive'));\n      document.querySelectorAll('.container-card__items-in-section').forEach((el) => el.classList.remove('inactive-block'));\n    }\n  }\n});\n\nBURGER_MENU.addEventListener('click', (event) => {\n  stateNow.category = event.target.innerHTML;\n  sessionStorage.setItem('stateNow', JSON.stringify(stateNow));\n});\nCARDS_CONTAINER.addEventListener('click', (event) => { // запоминаем категорию для генерации страницы\n  if (event.target.classList.contains('container-card__items_rotate')) return;\n  if (event.target.tagName === 'IMG') {\n    stateNow.category = event.target.nextElementSibling.innerHTML;\n    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));\n  } else if (event.target.tagName === 'P') {\n    stateNow.category = event.target.innerHTML;\n    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));\n  } else {\n    stateNow.category = event.target.querySelector('p').innerHTML;\n    sessionStorage.setItem('stateNow', JSON.stringify(stateNow));\n  }\n});\nif (typeof sessionStorage.stateNow !== 'undefined') { // берем режим если вернулись с другой страницы\n  stateNow = JSON.parse(sessionStorage.getItem('stateNow'));\n  mode = stateNow.mode;\n}\nBURGER_MENU.querySelectorAll('a').forEach((el) => {\n  if (el.text === stateNow.category) {\n    el.classList.add('active');\n  }\n});\nif (stateNow.mode === 'exam') { // меняем свойства в зависимости от режима\n  SWITCH_MODE.checked = true;\n  CARD_LIST.forEach((el) => el.classList.add('container-card__items_mode-play'));\n  BURGER_MENU.classList.add('burger-menu__menu_mode-play');\n  SWITCH_MODE_LABEL.classList.add('switch-mode__for_mode-play');\n  SWITCH_MODE_LABEL.innerHTML = 'Exam';\n} else {\n  SWITCH_MODE.checked = false;\n  CARD_LIST.forEach((el) => el.classList.remove('container-card__items_mode-play'));\n  BURGER_MENU.classList.remove('burger-menu__menu_mode-play');\n  SWITCH_MODE_LABEL.classList.remove('switch-mode__for_mode-play');\n  SWITCH_MODE_LABEL.innerHTML = 'Train';\n}\n\n\n//# sourceURL=webpack:///./src/header-script.js?");

/***/ })

/******/ });