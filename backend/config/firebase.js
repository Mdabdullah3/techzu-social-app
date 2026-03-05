// backend/config/firebase.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let serviceAccount;

try {
    if (process.env.FIREBASE_CONFIG) {
        // Use the variable from Render
        serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
        logger.info('Firebase Config loaded from Environment Variable');
    } else {
        // Use the local file on your computer
        const filePath = path.join(__dirname, 'firebase-key.json');
        serviceAccount = JSON.parse(readFileSync(filePath, 'utf8'));
        logger.info('Firebase Config loaded from local JSON file');
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        logger.info('Firebase Admin SDK initialized successfully');
    }
} catch (error) {
    logger.error('Firebase Initialization Error: ' + error.message);
}

export default admin;