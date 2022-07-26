import {checkEscapeKeydown, stringLengthValidation} from './util.js';
import {showMessage} from './util.js';
import {showSuccessMessage, showErrorMessage} from './post-creation-submit-message.js';
import {sendData} from './api.js';

let currentEffect;

const MAX_COMMENT_LENGTH = 140;
const RE_HASHTAG = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,19}\b\s?){1,4})?$/;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const commentError = `Комментарий не должен быть длиннее ${MAX_COMMENT_LENGTH} символов`;
const hashtagError = 'Поле имеет неверный формат';
const duplicateHashtagError = 'Хештеги не должны быть одинаковыми';

const FILTER_TYPE = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const FILTER_CSS_VALUE = {
  [FILTER_TYPE.CHROME]: 'grayscale',
  [FILTER_TYPE.SEPIA]: 'sepia',
  [FILTER_TYPE.MARVIN]: 'invert',
  [FILTER_TYPE.PHOBOS]: 'blur',
  [FILTER_TYPE.HEAT]: 'brightness',
};

const uploadFormElement = document.querySelector('.img-upload__form');
const editFormElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const postHashtagElement = uploadFormElement.querySelector('.text__hashtags');
const postDescriptionElement = uploadFormElement.querySelector('.text__description');
const uploadScaleElement = uploadFormElement.querySelector('.img-upload__scale');
const uploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');
const uploadEffectLevelElement = uploadFormElement.querySelector('.img-upload__effect-level');
const scaleControlElement = uploadFormElement.querySelector('.scale__control--value');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectLevelValueElement = uploadFormElement.querySelector('.effect-level__value');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');
const fileUploadElement = uploadFormElement.querySelector('#upload-file');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error'
});

const validateComment = (value) => stringLengthValidation(value, MAX_COMMENT_LENGTH);
const validateHashtag = (value) =>  {
  if(!value) {
    return true;
  }
  return RE_HASHTAG.test(value);
}
const validateDuplicateHashtag = (value) => {
  if(!value) {
    return true;
  }
  const hashtags = value.replace(/ +/,' ').trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(postDescriptionElement, validateComment, commentError);
pristine.addValidator(postHashtagElement, validateHashtag, hashtagError);
pristine.addValidator(postHashtagElement, validateDuplicateHashtag, duplicateHashtagError);

uploadFormElement.addEventListener('submit',(evt) => {
  const valid = pristine.validate();
  if(!valid) {
    evt.preventDefault();
  }
});

uploadScaleElement.addEventListener('click',(evt) => {
  const scaleSmaller = evt.target.closest('.scale__control--smaller');
  const scaleBigger = evt.target.closest('.scale__control--bigger');

  let scaleControlValue = +(scaleControlElement.value).replace('%','');

  if(scaleSmaller && scaleControlValue > MIN_SCALE_VALUE){
    scaleControlValue -= SCALE_STEP;
    uploadPreviewElement.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControlElement.value = `${scaleControlValue}%`;
  }

  if(scaleBigger && scaleControlValue < MAX_SCALE_VALUE){
    scaleControlValue += SCALE_STEP;
    uploadPreviewElement.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControlElement.value = `${scaleControlValue}%`;
  }
});

const getUpdateSlider = (
  min = 0,
  max  = 1,
  start = 1,
  step = 1 ,
  unit= '') => ({
  range: {
    min: min,
    max: max
  },
  start: start,
  step: step,
  connect: 'lower',
  format: {
    to: (value) =>  {
      if(Number.isInteger(value)) {
        return `${value.toFixed(0)}${unit}`;
      }
    },
    from: (value) => parseFloat(value.replace(unit,'')),
  }
});

const applyEffectToPost = (effectClass, effect) => {
  currentEffect = effect;

  uploadPreviewElement.classList.add(effectClass);
  uploadEffectLevelElement.classList.remove('hidden');
  uploadPreviewElement.style.filter = `${effect}(${effectLevelValueElement.value})`;
};

const deleteEffectFromPost = () => {
  uploadPreviewElement.classList.add('effects__preview--none');
  uploadEffectLevelElement.classList.add('hidden');
  uploadPreviewElement.removeAttribute('style');
};

noUiSlider.create(effectLevelSliderElement,getUpdateSlider());

effectLevelSliderElement.noUiSlider.on('update', () => {
  const level = effectLevelSliderElement.noUiSlider.get();
  uploadPreviewElement.style.filter = `${currentEffect}(${level})`;
});

const applySelectedEffect = (evt) => {
  uploadPreviewElement.classList.value = null;

  switch (evt.target.value) {
    case FILTER_TYPE.NONE:
      deleteEffectFromPost();
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.CHROME:
      applyEffectToPost('effects__preview--chrome',FILTER_CSS_VALUE.chrome);
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.SEPIA:
      applyEffectToPost('effects__preview--sepia',FILTER_CSS_VALUE.sepia);
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider());
      break;
    case FILTER_TYPE.MARVIN:
      applyEffectToPost('effects__preview--marvin',FILTER_CSS_VALUE.marvin);
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider(0,100,100,1,'%'));
      break;
    case FILTER_TYPE.PHOBOS:
      applyEffectToPost('effects__preview--phobos',FILTER_CSS_VALUE.phobos);
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider(0,3,3,0.1,'px'));
      break;
    case FILTER_TYPE.HEAT:
      applyEffectToPost('effects__preview--heat',FILTER_CSS_VALUE.heat);
      effectLevelSliderElement.noUiSlider.updateOptions(getUpdateSlider(1,3,3,0.1));
      break;
  }
};

const closePostCreation = () => {
  editFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydown);

  uploadFormElement.reset();
  pristine.reset();

  closeFormButtonElement.removeEventListener('click', closePostCreation);
  effectsListElement.removeEventListener('change', applySelectedEffect);
  editFormElement.removeEventListener('submit', postSubmitting);
  uploadPreviewElement.removeAttribute('style');

  effectLevelSliderElement.noUiSlider.reset();
  uploadPreviewElement.classList.value = null;
  currentEffect = null;
};

const createNewPost = () => {
  const file = fileUploadElement.files[0];
  if (!file.type.startsWith('image/')) {
    showMessage('Не удалось загрузить изображение');
    return;
  }

  editFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  effectsListElement.addEventListener('change', applySelectedEffect);
  uploadEffectLevelElement.classList.add('hidden');

  closeFormButtonElement.addEventListener('click', closePostCreation);
  window.addEventListener('keydown', escapeKeydown);
  uploadFormElement.addEventListener('submit', postSubmitting);

  const fileReader = new FileReader();
  fileReader.onload = (evt) => {
    uploadPreviewElement.src = evt.target.result;
  };

  fileReader.readAsDataURL(file);
};

function escapeKeydown (evt) {
  if(checkEscapeKeydown(evt)){
      if (evt.target.matches('input') && evt.target.type === 'text' || evt.target.matches('textarea')) {
        return;
      }
    closePostCreation();
  }
}

function postSubmitting(evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    uploadSubmitElement.disabled = true;
    sendData(
      () => {
        closePostCreation();
        showSuccessMessage();
        uploadSubmitElement.disabled = false;
      },
      () => {
        showErrorMessage();
        uploadSubmitElement.disabled = false;
      },

      new FormData(evt.target)
    );
  }
}

fileUploadElement.addEventListener('change', createNewPost);
