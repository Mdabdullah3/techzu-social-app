import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser } from '../controllers/userController.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';

const router = express.Router();

router.post('/', registerSchema, registerUser);
router.post('/login', loginSchema, loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutUser);

export default router;