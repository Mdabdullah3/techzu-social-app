import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { postSchema, commentSchema, updatePostSchema } from '../validations/postValidation.js';
import { addComment, createPost, deletePost, getPosts, toggleLike, updatePost } from '../controllers/postController.js';

const router = express.Router();
router.route('/')
    .get(getPosts)
    .post(protect, postSchema, createPost);

router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, commentSchema, addComment);
router.route('/:id')
    .patch(protect, updatePostSchema, updatePost)
    .delete(protect, deletePost);
export default router;