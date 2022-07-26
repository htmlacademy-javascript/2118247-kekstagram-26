import {renderFullScreenPost} from './post-full-screen-rendering.js';

const pictureBlockElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (posts) => {
  const pictures = document.createDocumentFragment();

  posts.forEach((post) => {
    const picture = pictureTemplateElement.cloneNode(true);
    picture.querySelector('.picture__img').src = post.url;
    picture.querySelector('.picture__likes').textContent = post.likes;
    picture.querySelector('.picture__comments').textContent = post.comments.length;

    picture.addEventListener('click', () => {
      renderFullScreenPost(post);
    });

    picture.dataset.postId = post.id;
    pictures.appendChild(picture);
  });

  pictureBlockElement.appendChild(pictures);
};

export {renderPosts};
