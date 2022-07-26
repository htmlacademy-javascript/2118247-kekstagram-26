import {checkEscapeKeydown} from './util.js';

const SHOWN_COMMENTS_AMOUNT = 5;

const fullScreenPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = fullScreenPictureElement.querySelector('.social__comments');
const socialCommentCountElement = fullScreenPictureElement.querySelector('.social__comment-count');
const uploadCommentsElement = fullScreenPictureElement.querySelector('.social__comments-loader');
const closeButtonElement = fullScreenPictureElement.querySelector('.big-picture__cancel');

const getCommentsAmount = (value) => {
  socialCommentCountElement.childNodes[0].textContent = `${value} из `;
};

const hideExtraComments = (comments) => {
  const extraComments = comments.slice(SHOWN_COMMENTS_AMOUNT);
  extraComments.forEach((extraComment) => {
    extraComment.classList.add('hidden');
  });
};

const getMoreComments = (comments) => {
  const commentsAmount = comments.length;

  if(commentsAmount <= SHOWN_COMMENTS_AMOUNT) {
    getCommentsAmount(commentsAmount);
    uploadCommentsElement.classList.add('hidden');
    return;
  }

  getCommentsAmount(SHOWN_COMMENTS_AMOUNT);

  let shownCommentsAmount = SHOWN_COMMENTS_AMOUNT;
  return function() {
    const availableAmount = commentsAmount - shownCommentsAmount;
    const newCommentsAmount = shownCommentsAmount + Math.min(SHOWN_COMMENTS_AMOUNT, availableAmount);

    const commentsToShow = comments.slice(shownCommentsAmount, newCommentsAmount);
    commentsToShow.forEach((comment) => {
      comment.classList.remove('hidden');
    });

    if (availableAmount <= SHOWN_COMMENTS_AMOUNT) {
      shownCommentsAmount += availableAmount;
      getCommentsAmount(shownCommentsAmount);
      uploadCommentsElement.classList.add('hidden');
      return;
    }

    shownCommentsAmount += SHOWN_COMMENTS_AMOUNT;
    getCommentsAmount(shownCommentsAmount);
  };
};

const showAllComments = (comments) => {
  let allComments = '';
  comments.forEach((comment) => {
    allComments +=
      `<li class="social__comment">
       <img
          class="social__picture"
          src="${comment.avatar}"
          alt="${comment.name}"
          width="35" height="35">
       <p class="social__text">${comment.message}</p>
      </li>`;
  });
  socialCommentsElement.innerHTML = allComments;
};

const closeFullScreen = () => {
  fullScreenPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButtonElement.removeEventListener('click', closeFullScreen);
  document.removeEventListener('keydown', closeFullScreen);

  uploadCommentsElement.onclick  = null;
  uploadCommentsElement.classList.remove('hidden');
};

const escapeKeydown = (evt) => {
  if(checkEscapeKeydown(evt)){
    closeFullScreen();
  }
};

const renderFullScreenPost = (post) => {
  fullScreenPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullScreenPictureElement.querySelector('.big-picture__img').querySelector('img').src = post.url;
  fullScreenPictureElement.querySelector('.likes-count').textContent = post.likes;
  fullScreenPictureElement.querySelector('.comments-count').textContent = post.comments.length;
  fullScreenPictureElement.querySelector('.social__caption').textContent = post.description;

  showAllComments(post.comments);

  const allComments = Array.from(socialCommentsElement.querySelectorAll('li'));
  hideExtraComments(allComments);
  uploadCommentsElement.onclick = getMoreComments(allComments);

  closeButtonElement.addEventListener('click', closeFullScreen);
  document.addEventListener('keydown', escapeKeydown);
};

export {renderFullScreenPost};
