import {generatePosts} from './postsGenerator.js';
import {renderPosts, bindPostClickEvent} from './postsRender.js';
import {openPostOnFullScreen} from './openPostOnFullScreen.js';

const posts = generatePosts();
renderPosts(posts);

bindPostClickEvent((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  openPostOnFullScreen(selectedPost);
});
