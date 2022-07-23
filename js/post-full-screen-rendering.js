import {checkEscapeKeydown} from './util.js';

const SHOWN_COMMENTS_AMOUNT = 5;

const fullScreenPicture = document.querySelector('.big-picture');
const socialComments = fullScreenPicture.querySelector('.social__comments');
const socialCommentCount = fullScreenPicture.querySelector('.social__comment-count');
const uploadComments = fullScreenPicture.querySelector('.social__comments-loader');
const closeButton = fullScreenPicture.querySelector('.big-picture__cancel');

const getCommentsAmount = (value) => {
  socialCommentCount.childNodes[0].textContent = `${value} из `;
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
    uploadComments.classList.add('hidden');
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
      uploadComments.classList.add('hidden');
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
  socialComments.innerHTML = allComments;
};

const closeFullScreen = () => {
  fullScreenPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeFullScreen);
  document.removeEventListener('keydown', closeFullScreen);

  uploadComments.onclick  = null;
  uploadComments.classList.remove('hidden');
};

const escapeKeydown = (evt) => {
  if(checkEscapeKeydown(evt)){
    closeFullScreen();
  }
};

const renderFullScreenPost = (post) => {
  fullScreenPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fullScreenPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  fullScreenPicture.querySelector('.likes-count').textContent = post.likes;
  fullScreenPicture.querySelector('.comments-count').textContent = post.comments.length;
  fullScreenPicture.querySelector('.social__caption').textContent = post.description;

  showAllComments(post.comments);

  const allComments = Array.from(socialComments.querySelectorAll('li'));
  hideExtraComments(allComments);
  uploadComments.onclick = getMoreComments(allComments);

  closeButton.addEventListener('click', closeFullScreen);
  document.addEventListener('keydown', escapeKeydown);
};

export {renderFullScreenPost};
