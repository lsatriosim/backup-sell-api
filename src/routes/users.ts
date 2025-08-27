const express = require('express');
import { AuthController } from '../controllers/auth_controller';
import { verifyAdminToken } from '../middleware/authmiddleware';

const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.get('/check-auth', verifyAdminToken, authController.checkAuth);
authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', verifyAdminToken, authController.logout);
authRoutes.get('/profile', authController.getProfile);

export default authRoutes;