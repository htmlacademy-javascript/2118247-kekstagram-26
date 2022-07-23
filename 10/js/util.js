const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Escape';
const checkEscapeKeydown = (evt) => evt.key === KEY_ESC;

function stringLengthValidation(str, maxLen)
{
  if(str.length <= maxLen) {
    return(true);
  }
  return(false);
}

const showAlert = (message) => {

  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alertError');

  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, ALERT_SHOW_TIME);
};

export {checkEscapeKeydown, stringLengthValidation, showAlert};

