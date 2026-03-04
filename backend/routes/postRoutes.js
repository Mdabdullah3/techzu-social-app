import express from 'express';
import { createPost, getPosts, toggleLike, addComment } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { postSchema, commentSchema } from '../validations/postValidation.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, postSchema, createPost);

router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, commentSchema, addComment);

export default router;