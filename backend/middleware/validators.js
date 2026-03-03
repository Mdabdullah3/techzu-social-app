import { body, validationResult } from 'express-validator';
import ErrorHandler from '../utils/errorHandler.js';

export const validateRegister = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorHandler(errors.array()[0].msg, 400));
        }
        next();
    },
];