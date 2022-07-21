import {generatePosts} from './postsGenerator.js';
import {renderPosts, bindPostClickEvent} from './postsRender.js';
import {openPostOnFullScreen} from './openPostOnFullScreen.js';
import {createNewPost} from './newPostCreator.js';

const posts = generatePosts();
renderPosts(posts);

bindPostClickEvent((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  openPostOnFullScreen(selectedPost);
});

createNewPost();
