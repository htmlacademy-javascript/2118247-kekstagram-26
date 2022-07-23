import {getData} from './api.js';
import {initPostsFilter} from './posts-filter.js';
import {renderPosts} from './posts-rendering.js';
import './post-creation.js';

getData((posts) => {
  renderPosts(posts);
  initPostsFilter(posts);
});
