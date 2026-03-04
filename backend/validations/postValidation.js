import { body, validationResult } from 'express-validator';
import ErrorHandler from '../utils/errorHandler.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(errors.array()[0].msg, 400));
    }
    next();
};

export const postSchema = [
    body('text').notEmpty().withMessage('Post content cannot be empty').trim(),
    validate
];

export const commentSchema = [
    body('text').notEmpty().withMessage('Comment cannot be empty').trim(),
    validate
];