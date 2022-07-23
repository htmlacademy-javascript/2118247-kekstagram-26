import {showAlert} from './util.js';

const getDataError = 'Ошибка получения данных';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch(() => showAlert(getDataError));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',{method:'POST', body})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export {getData, sendData};
