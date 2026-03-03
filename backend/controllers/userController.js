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

    // 1. Create User
    const user = await User.create({ name, email, password });

    // 2. Generate Tokens AFTER user is created
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 3. Save Refresh Token to DB
    user.refreshToken = refreshToken;
    await user.save();

    sendResponse(res, 201, true, 'User registered', {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    });
});

// @desc    Login user
export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save to DB so we can verify it later
    user.refreshToken = refreshToken;
    await user.save();

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