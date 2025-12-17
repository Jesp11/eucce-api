import dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
}