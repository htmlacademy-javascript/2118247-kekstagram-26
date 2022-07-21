import {generatePosts} from './posts-generation.js';
import {renderPosts, bindPostClickEvent} from './posts-rendering.js';
import {postFullScreenRendering} from './post-full-screen-rendering.js';
import {createNewPost} from './newPostCreator.js';

const posts = generatePosts();
renderPosts(posts);

bindPostClickEvent((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  postFullScreenRendering(selectedPost);
});

createNewPost();
