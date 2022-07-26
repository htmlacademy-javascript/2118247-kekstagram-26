import {renderFullScreenPost} from './post-full-screen-rendering.js';

const pictureBlockElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (posts) => {
  const pictures = document.createDocumentFragment();

  posts.forEach((post) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = post.url;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;

    pictureElement.addEventListener('click', () => {
      renderFullScreenPost(post);
    });

    pictureElement.dataset.postId = post.id;
    pictures.appendChild(pictureElement);
  });

  pictureBlockElement.appendChild(pictures);
};

export {renderPosts};
