import {checkEscapeKeydown} from './util.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successButtonElement = successMessageElement.querySelector('.success__button');
const errorButtonElement = errorMessageElement.querySelector('.error__button');

let activeMessage;

const closeMessage = () => {
  document.body.removeChild(activeMessage);
  window.removeEventListener('keydown', escapeKeydown, true);
  window.removeEventListener('click', onClickMessageForm);
};

function escapeKeydown(evt) {
  if(checkEscapeKeydown(evt)){
    evt.stopImmediatePropagation();
    closeMessage();
  }
}

function onClickMessageForm (evt) {
  if (evt.target === activeMessage){
    closeMessage();
  }
}

const showSuccessMessage = () => {
  activeMessage = successMessageElement;
  document.body.appendChild(successMessageElement);

  successButtonElement.addEventListener('click', closeMessage, { once: true });
  window.addEventListener('keydown', escapeKeydown);
  window.addEventListener('click', onClickMessageForm);
};

const showErrorMessage = () => {
  activeMessage = errorMessageElement;
  document.body.appendChild(errorMessageElement);

  errorButtonElement.addEventListener('click', closeMessage, { once:true });
  window.addEventListener('keydown', escapeKeydown);
  window.addEventListener('click', onClickMessageForm);
};

export {showSuccessMessage, showErrorMessage};
