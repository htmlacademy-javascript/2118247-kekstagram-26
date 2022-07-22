import {generatePosts} from './posts-generation.js';
import {renderPosts, bindPostClickEvent} from './posts-rendering.js';
import {renderFullScreenPost} from './post-full-screen-rendering.js';
import {createNewPost} from './post-creation.js';

const posts = generatePosts();
renderPosts(posts);

bindPostClickEvent((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  renderFullScreenPost(selectedPost);
});

createNewPost();
