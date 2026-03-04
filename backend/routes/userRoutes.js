import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser, getMe } from '../controllers/userController.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerSchema, registerUser);
router.post('/login', loginSchema, loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe); 
export default router;