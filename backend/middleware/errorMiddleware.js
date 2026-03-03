const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Handle Wrong MongoDB ID Error (Cast Error)
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
        err.message = message;
    }

    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err.statusCode = 400;
        err.message = message;
    }

    // Handle Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = `JSON Web Token is invalid. Try again`;
        err.statusCode = 400;
        err.message = message;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorMiddleware;