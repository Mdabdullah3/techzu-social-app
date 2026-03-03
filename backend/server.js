import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import swaggerSpec from './config/swagger.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
// Load environment variables 
dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Morgan + Winston Integration
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Swagger Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base Route
app.get('/', (req, res) => {
    res.send('API is running... Visit /api-docs for documentation');
});
app.use('/api/v1/users', userRoutes);

// Global Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});