import '../styles/style.css';
import {
  mainPageHeaderNode, mainPageContentNode, mainPageResultBlockNode, mainPageButtonsBlockNode, nodeAuthorizationPage,
} from './nodes';
import AuthorizationPageClass from './authorization-page.class';
import MainPageClass from './main-page.class';

if (typeof localStorage.state === 'undefined') {
  const state = {
    currentExample: 1,
    level: 1,
    round: 1,
    translateHint: false,
    backgroundHint: true,
    audioBeginHint: true,
    audioRepeatHint: false,
  };
  localStorage.setItem('state', JSON.stringify(state));
}


async function renderMainPage() {
  const authorizationPageNode = document.querySelector('.authorization-page');
  authorizationPageNode.parentNode.removeChild(authorizationPageNode);
  const mainPage = new MainPageClass(mainPageContentNode, mainPageResultBlockNode);
  mainPage.renderMainPageWrapper();
  const mainPageWrapper = document.querySelector('.main-page');
  mainPage.renderMainPageHeader(mainPageWrapper, mainPageHeaderNode);
  await mainPage.renderMainPageContent(mainPageContentNode);
  mainPage.renderMainPageButtonsBlock(mainPageWrapper, mainPageButtonsBlockNode);
  mainPage.renderMainPageResultBlock(mainPageResultBlockNode);
  mainPage.defineHintsState();
  const checkBtn = document.querySelector('.main-page__buttons__check');
  const dntKnowBtn = document.querySelector('.main-page__buttons__dnt-know');
  const translateBtn = document.querySelector('.main-page__control-block__hints__translate');
  const audioBeginBtn = document.querySelector('.main-page__control-block__hints__audio-begin');
  const audioRepeatBtn = document.querySelector('.main-page__control-block__hints__audio-repeat');

  translateBtn.addEventListener('click', () => {
    const state = JSON.parse(localStorage.getItem('state'));
    translateBtn.classList.toggle('active');
    mainPage.showOrHideTranslate(translateBtn.classList.contains('active'));
    state.translateHint = translateBtn.classList.contains('active');
    localStorage.setItem('state', JSON.stringify(state));
  });

  audioRepeatBtn.addEventListener('click', () => {
    mainPage.audioHint();
  });

  /* backgroundBtn.addEventListener('click', () => { // little time
    const state = JSON.parse(localStorage.getItem('state'));
    backgroundBtn.classList.toggle('active');
    state.backgroundHint = backgroundBtn.classList.contains('active');
    localStorage.setItem('state', JSON.stringify(state));
    mainPage.renderPuzzleInCurrentString(state.backgroundHint)

  }) */

  checkBtn.addEventListener('click', mainPage.checkResultBlock);

  dntKnowBtn.addEventListener('click', mainPage.correctSequence);
}

const state = JSON.parse(localStorage.getItem('state'));
const wrapper = document.querySelector('.wrapper');
const authorizationPageClass = new AuthorizationPageClass(wrapper, nodeAuthorizationPage);

authorizationPageClass.renderAuthorizationPage();

const registrationBtn = document.querySelector('.authorization-page__btns__registration');
const loginBtn = document.querySelector('.authorization-page__btns__log-in');
const inputLogin = document.querySelector('.authorization-page_authorization-form__login__input');
const inputPassword = document.querySelector('.authorization-page_authorization-form__password__input');

registrationBtn.addEventListener('click', async () => {
  const registrationData = {};
  registrationData.email = inputLogin.value;
  registrationData.password = inputPassword.value;
  authorizationPageClass.registration(registrationData);
});

loginBtn.addEventListener('click', async () => {
  const startBtn = document.querySelector('.start-block__btn');
  const loginData = {};
  loginData.email = inputLogin.value;
  loginData.password = inputPassword.value;
  const authorizationResult = await authorizationPageClass.authorization(loginData);
  if (authorizationResult !== undefined) {
    state.login = inputLogin.value;
    state.password = inputPassword.value;
    localStorage.setItem('state', JSON.stringify(state));
    authorizationPageClass.renderStartBlock();
    startBtn.addEventListener('click', () => {
      renderMainPage();
    });
  }
});
