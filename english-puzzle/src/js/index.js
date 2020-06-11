import '../styles/style.css';
import {mainPageHeaderNode, mainPageContentNode, mainPageResultBlockNode, mainPageButtonsBlockNode} from './nodes'
import AuthorizationPageClass from './authorization-page.class'
import MainPageClass from './main-page.class'

let mainPage = new MainPageClass(mainPageContentNode, mainPageResultBlockNode);

mainPage.renderMainPageWrapper();

const mainPageWrapper = document.querySelector('.main-page')

mainPage.renderMainPageHeader(mainPageWrapper, mainPageHeaderNode);
mainPage.renderMainPageContent(mainPageContentNode);
mainPage.renderMainPageResultBlock(mainPageResultBlockNode);
mainPage.renderMainPageButtonsBlock(mainPageWrapper, mainPageButtonsBlockNode);




const checkBtn = document.querySelector('.main-page__buttons__check');
const clearBtn = document.querySelector('.main-page__buttons__clear');

checkBtn.addEventListener('click', () => {
  const state = JSON.parse(localStorage.getItem('state'));
    const resultBlock = document.querySelector('.main-page__result-block');
    const resultNodes = resultBlock.querySelectorAll('.main-page__main-block__string__el');
    let result = [];
    resultNodes.forEach(el => {
      result.push(el.textContent)
    })
    console.log(result)
    let count = 0;
    resultNodes.forEach((el, index) => {
      if(el.textContent === state.words[state.currentExample - 1].example[index]) {
        el.style.backgroundColor = 'green';
        count += 1;
      } else {
        el.style.backgroundColor = 'red'
      }
    })
    if(count === result.length&&count!==0) {
      function foo(){const state = JSON.parse(localStorage.getItem('state'));
      state.currentExample += 1;
      localStorage.setItem('state', JSON.stringify(state));
      document.querySelector('.main-page__result-block').parentElement.removeChild(document.querySelector('.main-page__result-block'))
      document.querySelector('.main-page__main-block').parentElement.removeChild(document.querySelector('.main-page__main-block'))
      mainPage.renderMainPageContent(mainPageContentNode);
      mainPage.renderMainPageResultBlock(mainPageResultBlockNode);}
      setTimeout(foo, 2000)
    }
})

clearBtn.addEventListener('click', () => {
  console.log('as')
  document.querySelector('.main-page__result-block').parentElement.removeChild(document.querySelector('.main-page__result-block'))
  document.querySelector('.main-page__main-block').parentElement.removeChild(document.querySelector('.main-page__main-block'))
  mainPage.renderMainPageContent(mainPageContentNode);
  mainPage.renderMainPageResultBlock(mainPageResultBlockNode);
})






/* const state = JSON.parse(localStorage.getItem('state'));
const authorizationPageClass = new AuthorizationPageClass(targetNode, nodeAuthorizationPage);
const mainPageClass = new MainPageClass(targetNode, nodeMainPage) */

/* authorizationPageClass.renderAuthorizationPage();

const registrationBtn = document.querySelector('.authorization-page__btns__registration');
const loginBtn = document.querySelector('.authorization-page__btns__log-in');
const inputLogin = document.querySelector('.authorization-page_authorization-form__login__input');
const inputPassword = document.querySelector('.authorization-page_authorization-form__password__input');

registrationBtn.addEventListener('click', async() => {
  let registrationData = {};
  registrationData.email = inputLogin.value;
  registrationData.password = inputPassword.value;
  authorizationPageClass.registration(registrationData);
})

loginBtn.addEventListener('click', async() => {
  let loginData = {};
  loginData.email = inputLogin.value;
  loginData.password = inputPassword.value;
  const authorizationResult = await authorizationPageClass.authorization(loginData);
  if(authorizationResult.message === 'Authenticated') {
    state.login = inputLogin.value;
    state.password = inputPassword.value;
    localStorage.setItem('state', JSON.stringify(state));
    main()
  }
}) */




