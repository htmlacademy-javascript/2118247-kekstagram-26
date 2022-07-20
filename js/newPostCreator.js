import {stringLengthValidation} from "./helper.js";

const uploadForm = document.querySelector('.img-upload__form');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const uploadFileButton = uploadForm.querySelector('.img-upload__input');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const postHashtag = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error'
});

const commentValidator = (value) => stringLengthValidation(value, 100);
pristine.addValidator(postDescription, commentValidator,
  `Значение поля «Комментарий» должно быть строкой с максимальной длиной 100 символов.`);

const hashtagRegularExpression = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;
const hashtagValidator = (value) => hashtagRegularExpression.test(value);
pristine.addValidator(postHashtag, hashtagValidator,
  'Поле «Хештег» имеет неверный формат');

const duplicateHashtagValidator = (value) => {
  if(!value) {
    return true;
  }
  const hashtags = value.replace(/ +/,' ').trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(postHashtag, duplicateHashtagValidator,
  'Хештеги не должны быть одинаковыми');

uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();}
});

const close = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
};

const escapeKeydown = (evt) => {
  if(evt.key === 'Escape'){
    close();
  }
};

const createNewPost = () => {
  uploadFileButton.addEventListener('change', () => {
    editForm.classList.remove('hidden');
    document.body.classList.add('modal-open');

    closeFormButton.addEventListener('click', close);
    window.addEventListener('keydown', escapeKeydown);
  });
};

export { createNewPost };
