import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { postSchema, commentSchema } from '../validations/postValidation.js';
import { addComment, createPost, getPosts, toggleLike } from '../controllers/postController.js';

const router = express.Router();
router.route('/')
    .get(getPosts)
    .post(protect, postSchema, createPost);

router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, commentSchema, addComment);

export default router;