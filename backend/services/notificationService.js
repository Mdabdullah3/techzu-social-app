// backend/services/notificationService.js
import admin from 'firebase-admin'; // This will be the initialized one
import logger from '../config/logger.js';

export const sendPushNotification = async (targetToken, title, body, data = {}) => {
    if (!targetToken) return;

    const message = {
        token: targetToken,
        notification: { title, body },
        android: {
            priority: 'high', // CRITICAL: This wakes up the phone
            notification: {
                channelId: 'default',
                sound: 'default',
            }
        },
        data: {
            ...data,
            postId: String(data.postId || ''),
        },
    };

    try {
        const response = await admin.messaging().send(message);
        logger.info(`Successfully sent notification: ${response}`);
        return response;
    } catch (error) {
        logger.error(`Error sending notification: ${error.message}`);
    }
};