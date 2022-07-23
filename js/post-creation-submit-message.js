import {checkEscapeKeydown} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

let activeMessage;

function escapeKeydown(evt) {
  if(checkEscapeKeydown(evt)){
    evt.stopImmediatePropagation();
    closeMessage();
  }
}

const closeMessage = () => {
  document.body.removeChild(activeMessage);
  window.removeEventListener('keydown',escapeKeydown, true);
  window.removeEventListener('click',onClickMessageForm);
};

function onClickMessageForm (evt) {
  if (evt.target === activeMessage){
    closeMessage();
  }
}

const showSuccessMessage = () => {
  activeMessage = successMessage;
  document.body.appendChild(successMessage);

  successButton.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown',escapeKeydown);
  window.addEventListener('click',onClickMessageForm);
};

const showErrorMessage = () => {
  activeMessage = errorMessage;
  document.body.appendChild(errorMessage);

  errorButton.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown',escapeKeydown);
  window.addEventListener('click',onClickMessageForm);
};

export {showSuccessMessage, showErrorMessage};
