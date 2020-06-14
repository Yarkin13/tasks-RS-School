import {
  errorHandlerRegistrationExistEmail, errorHandlerRegistrationInvalid,
  errorHandlerLogInIncorrectEmailOfPassword,
} from './services/error-handler';

export default class AuthorizationPageModule {
  constructor(targetNode, node) {
    this.targetNode = targetNode;
    this.node = node;
  }

  renderAuthorizationPage() {
    this.targetNode.insertAdjacentHTML('afterbegin', this.node);
  }

  async registration(registrationData) {
    try {
      const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      const content = await rawResponse.json();
      if (content.hasOwnProperty('error')) {
        const errors = content.error.errors.map(el => el.message);
        errorHandlerRegistrationInvalid(errors);
      } else {
        document.querySelector('.notice-block__description').textContent = 'Registration completed successfully';
        const noticeBlock = document.querySelector('.notice-block');
        noticeBlock.style = 'display: block';
        function hideNoticeBlock() {
          noticeBlock.style = 'display: none';
        }
        setTimeout(hideNoticeBlock, 3000);
      }
    } catch (er) {
      errorHandlerRegistrationExistEmail(er);
    }
  }

  async authorization(loginData) {
    try {
      const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      errorHandlerLogInIncorrectEmailOfPassword();
    }
  }

  renderStartBlock() {
    const authorizationPage = document.querySelector('.authorization-page__wrapper');
    const startBlock = document.querySelector('.start-block');
    authorizationPage.style.top = '1000px';
    startBlock.style.top = '0';
  }
}
