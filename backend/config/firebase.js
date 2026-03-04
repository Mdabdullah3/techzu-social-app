import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import logger from './logger.js';

const initializeFirebase = async () => {
    try {
        const serviceAccount = JSON.parse(
            await readFile(new URL('./firebase-key.json', import.meta.url))
        );
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        logger.info('Firebase Admin SDK initialized successfully');
    } catch (error) {
        logger.error('Firebase Initialization Error: ', error.message);
    }
};

export default initializeFirebase;