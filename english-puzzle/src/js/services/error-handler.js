export function errorHandlerRegistrationExistEmail() {
  const noticeDescriptions = document.querySelector('.notice-block__description');
  const noticeBlock = document.querySelector('.notice-block');
  noticeDescriptions.textContent = 'А user with that email already exists';
  noticeBlock.style = 'display: block';
  function hideNoticeBlock() {
    noticeBlock.style = 'display: none';
  }
  setTimeout(hideNoticeBlock, 3000);
}

export function errorHandlerRegistrationInvalid(errors) {
  const noticeDescriptions = document.querySelectorAll('.notice-block__description');
  const noticeBlock = document.querySelector('.notice-block');
  noticeDescriptions.forEach((el, index) => {
    el.textContent = errors[index];
  });
  noticeBlock.style = 'display: block';
  function hideNoticeBlock() {
    noticeBlock.style = 'display: none';
    noticeDescriptions.forEach(el => el.textContent = '');
  }
  setTimeout(hideNoticeBlock, 3000);
}


export function errorHandlerLogInIncorrectEmailOfPassword() {
  const noticeDescriptions = document.querySelector('.notice-block__description');
  const noticeBlock = document.querySelector('.notice-block');
  noticeDescriptions.textContent = 'Incorrect e-mail or password';
  noticeBlock.style = 'display: block';
  function hideNoticeBlock() {
    noticeBlock.style = 'display: none';
  }
  setTimeout(hideNoticeBlock, 3000);
}
