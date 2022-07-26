import {debounce, randomNumber} from './util.js';
import {renderPosts} from './posts-rendering.js';

const POST_MAX_COUNT = 10;
const RERENDER_DELAY = 500;

const pictureBlockElement = document.querySelector('.pictures');
const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');
const filterButtonElement = filtersElement.querySelectorAll('.img-filters__button');

const showFilterPosts = () => {
  filtersElement.classList.remove('img-filters--inactive');
  filtersElement.classList.add('img-filters--active');
};

const enableFilterPosts = () => {
  filterButtonElement.forEach((button) => {
    button.disabled = false;
  });
};

const filterPostsDefault = (userPosts) => userPosts;

const filterPostsDiscuss = (userPosts) => userPosts.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

const filterPostsRandom = (posts) => {
  const min = 0;
  const max = posts.length - 1;

  const randomPostsIndexes = [];
  for (let i = 0; i < POST_MAX_COUNT; i++) {
    const randomIndex = randomNumber(min, max);
    if(!randomPostsIndexes.includes(randomIndex)) {
      randomPostsIndexes.push(randomIndex);
    }
  }

  return randomPostsIndexes.map((index) => posts[index]);
};

const changeFilterClassName = (filterName) => {
  document.querySelectorAll('.img-filters__button')
    .forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = pictureBlockElement.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      renderPosts(filterPostsDiscuss(userPosts));
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      renderPosts(filterPostsRandom(userPosts));
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      renderPosts(filterPostsDefault(userPosts));
      break;
  }
}, RERENDER_DELAY);

const initPostsFilter = (userPosts) => {
  filtersFormElement.addEventListener('click', (evt) => postFilterChange(evt, userPosts));
  showFilterPosts();
  enableFilterPosts();
};

export {initPostsFilter};
