import {renderPosts, bindPostClickEvent} from './posts-rendering.js';
import {renderFullScreenPost} from './post-full-screen-rendering.js';
import {getData} from './api.js';
import {createNewPost} from './post-creation.js';

getData((posts) => {
  renderPosts(posts);
  bindPostClickEvent((postId) => {
    const selectedPost = posts.find((post) => post.id === +postId);
    renderFullScreenPost(selectedPost);
  });
});

createNewPost();
