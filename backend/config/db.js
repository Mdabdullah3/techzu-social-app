import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Database Connection Error: ${error.message}`);
        // Try to reconnect every 5 seconds
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;