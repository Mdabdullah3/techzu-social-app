import Post from '../models/Post.js';
import catchAsync from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendResponse from '../utils/sendResponse.js';
import { sendPushNotification } from '../services/notificationService.js';
import User from '../models/User.js';
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
    // Inside toggleLike after post.save()...
    if (!isLiked) { // Only notify on Like, not Unlike
        const postOwner = await User.findById(post.user);

        // Don't notify if the user likes their own post
        if (postOwner && postOwner.fcmToken && postOwner._id.toString() !== req.user._id.toString()) {
            await sendPushNotification(
                postOwner.fcmToken,
                'New Like! ❤️',
                `${req.user.name} liked your post: "${post.text.substring(0, 20)}..."`,
                { postId: post._id.toString() }
            );
        }
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
    // Inside addComment after post.save()...
    const postOwner = await User.findById(post.user);
    if (postOwner && postOwner.fcmToken && postOwner._id.toString() !== req.user._id.toString()) {
        await sendPushNotification(
            postOwner.fcmToken,
            'New Comment! 💬',
            `${req.user.name} commented: "${req.body.text.substring(0, 20)}..."`,
            { postId: post._id.toString() }
        );
    }
    post.comments.push(comment);
    await post.save();
    sendResponse(res, 201, true, 'Comment added', post);
});

// @desc    Update a post
// @route   PATCH /api/v1/posts/:id
export const updatePost = catchAsync(async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorHandler('Post not found', 404));

    // Security Check: Is the user the owner of the post?
    if (post.user.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not authorized to update this post', 403));
    }

    post = await Post.findByIdAndUpdate(req.params.id, { text: req.body.text }, {
        new: true,
        runValidators: true
    });

    sendResponse(res, 200, true, 'Post updated successfully', post);
});

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
export const deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorHandler('Post not found', 404));

    // Security Check: Is the user the owner?
    if (post.user.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not authorized to delete this post', 403));
    }

    await post.deleteOne();

    sendResponse(res, 200, true, 'Post removed successfully');
});