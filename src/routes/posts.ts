const express = require('express');
import { PostController } from '../controllers/post_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.post('/create', verifyAdminToken, postController.createPost);

export default postRoutes;