import admin from 'firebase-admin';
import logger from '../config/logger.js';

export const sendPushNotification = async (targetToken, title, body, data = {}) => {
    if (!targetToken) return;
    const message = {
        notification: { title, body },
        data: {
            ...data,
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        token: targetToken,
    };
    try {
        const response = await admin.messaging().send(message);
        logger.info(`Successfully sent notification: ${response}`);
        return response;
    } catch (error) {
        logger.error(`Error sending notification: ${error.message}`);
    }
};