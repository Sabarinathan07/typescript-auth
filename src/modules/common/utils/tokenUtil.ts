import jwt from 'jsonwebtoken';
const accessTokenSecret = process.env.JWT_SECRET || 'secret';
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'secret';

export class TokenUtil {
    generateToken(userId: string) {
        return jwt.sign({ id: userId }, accessTokenSecret, {
            expiresIn: '1h',
        });
    }

    verifyToken(token: string) {
        return jwt.verify(token, accessTokenSecret);
    }

    // Generates access token (short-lived)
    generateAccessToken(userId: string) {
        return jwt.sign({ id: userId }, accessTokenSecret, {
            expiresIn: '15m',
        });
    }

    // Generates refresh token (long-lived)
    generateRefreshToken(userId: string) {
        return jwt.sign({ id: userId }, refreshTokenSecret, {
            expiresIn: '7d',
        });
    }

    // Verifies access token
    verifyAccessToken(token: string) {
        return jwt.verify(token, accessTokenSecret);
    }

    // Verifies refresh token
    verifyRefreshToken(token: string) {
        return jwt.verify(token, refreshTokenSecret);
    }
}
