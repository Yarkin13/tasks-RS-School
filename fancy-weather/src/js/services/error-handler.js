export function errorHandler() {
  const errorNode = document.querySelector('.error-msg');
  errorNode.classList.add('show-msg');
  const hide = () => {
    errorNode.classList.remove('show-msg');
  };
  setTimeout(hide, 2000);
}
