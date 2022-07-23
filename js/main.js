import {getData} from './api.js';
import {createNewPost} from './post-creation.js';
import {initPostsFilter} from './posts-filter.js';
import {renderPosts} from './posts-rendering.js';

getData((posts) => {
  renderPosts(posts);
  initPostsFilter(posts);
});

createNewPost();
