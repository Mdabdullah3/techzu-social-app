import Post from '../models/Post.js';
import catchAsync from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendResponse from '../utils/sendResponse.js';

// @desc    Create a post
export const createPost = catchAsync(async (req, res, next) => {
    const post = await Post.create({
        user: req.user._id,
        userName: req.user.name,
        text: req.body.text
    });
    sendResponse(res, 201, true, 'Post created', post);
});

// @desc    Get Feed (with optional username filter)
export const getPosts = catchAsync(async (req, res, next) => {
    const { username } = req.query;
    let query = {};
    if (username) {
        query.userName = new RegExp(username, 'i'); 
    }
    const posts = await Post.find(query).sort({ createdAt: -1 });
    sendResponse(res, 200, true, 'Feed retrieved', posts);
});

// @desc    Toggle Like (Like/Unlike)
export const toggleLike = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
        // Unlike: Remove user ID from array
        post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
        // Like: Add user ID to array
        post.likes.push(req.user._id);
    }

    await post.save();
    sendResponse(res, 200, true, isLiked ? 'Unliked' : 'Liked', post);
});

// @desc    Add Comment
export const addComment = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));

    const comment = {
        user: req.user._id,
        userName: req.user.name,
        text: req.body.text
    };

    post.comments.push(comment);
    await post.save();
    sendResponse(res, 201, true, 'Comment added', post);
});