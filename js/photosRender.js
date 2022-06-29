import {generatePhotos} from './photosGenerator.js';

const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function renderPhotos() {
  let pictures = document.createDocumentFragment();
  let photos = generatePhotos();
  for (let i = 0; i < photos.length; i++) {
    let picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = photos[i].url;
    picture.querySelector('.picture__likes').textContent = photos[i].likes;
    picture.querySelector('.picture__comments').textContent = photos[i].comments.length;

    pictures.appendChild(picture);
  }

  pictureBlock.appendChild(pictures);
}

export {renderPhotos};
