const express = require('express');
import { PostController } from '../controllers/post_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.post('/create', verifyAdminToken, postController.createPost);
postRoutes.get('/list', verifyAdminToken, postController.getPosts);
postRoutes.get('/my-list', verifyAdminToken, postController.getMyPosts);
postRoutes.get('/list/:date', verifyAdminToken, postController.getPostByDate);
postRoutes.post('/update', verifyAdminToken, postController.updatePost);
postRoutes.post('/update-status', verifyAdminToken, postController.updatePostStatus);
postRoutes.post('/delete', verifyAdminToken, postController.deletePost);

export default postRoutes;