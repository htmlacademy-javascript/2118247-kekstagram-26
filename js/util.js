const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Escape';
const checkEscapeKeydown = (evt) => evt.key === KEY_ESC;

function randomNumber(min, max)
{
  if(min > max || min < 0) {
    throw Error;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stringLengthValidation(str, maxLen)
{
  if(str.length <= maxLen) {
    return(true);
  }
  return(false);
}

const showMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');

  div.textContent = message;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {randomNumber, checkEscapeKeydown, stringLengthValidation, showMessage, debounce};
