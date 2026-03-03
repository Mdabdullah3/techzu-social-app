import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import catchAsync from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendResponse from '../utils/sendResponse.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';

// @desc    Register a new user
export const registerUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return next(new ErrorHandler('User already exists', 400));
    const user = new User({ name, email, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    sendResponse(res, 201, true, 'User registered successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    });
});

export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save(); // This now works because the pre-save hook is fixed!

    sendResponse(res, 200, true, 'Logged in', {
        _id: user._id,
        name: user.name,
        accessToken,
        refreshToken,
    });
});

// @desc    Logout / Clear Refresh Token
export const logoutUser = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;

    // Find user with this token and remove it
    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = undefined;
        await user.save();
    }

    sendResponse(res, 200, true, 'Logged out successfully');
});

// @desc    Refresh Token logic
export const refreshAccessToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(new ErrorHandler('No Refresh Token', 400));

    const user = await User.findOne({ refreshToken });
    if (!user) return next(new ErrorHandler('Invalid Refresh Token', 403));

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return next(new ErrorHandler('Token expired', 403));

        const newAccessToken = generateAccessToken(user._id);
        sendResponse(res, 200, true, 'Token refreshed', { accessToken: newAccessToken });
    });
});