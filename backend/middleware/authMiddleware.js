import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import catchAsync from './catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';

export const protect = catchAsync(async (req, res, next) => {
    let token;
    // 1. Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new ErrorHandler('Not authorized, please login', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return next(new ErrorHandler('Token invalid or expired', 401));
    }
});