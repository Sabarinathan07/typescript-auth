import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AuthService } from '../services/authService';
import { TokenUtil } from '../../common/utils/tokenUtil';
import logger from '../../common/utils/logger';

export class AuthController {
    constructor(private authService: AuthService, private tokenUtil: TokenUtil) {}

    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const user = await this.authService.register(username, password);
            logger.info(`User registered: ${user.username}`);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        logger.info(`User logged in: ${username}`);

        try {
            const { accessToken, refreshToken } = await this.authService.login(username, password);
            res.status(200).json({ accessToken, refreshToken });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    refreshToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(403).json({
                message: 'Refresh token is required',
            });
            return;
        }

        try {
            const decoded: any = this.tokenUtil.verifyRefreshToken(refreshToken);
            const newAccessToken: any = this.tokenUtil.generateAccessToken(decoded.id);
            res.json({ accessToken: newAccessToken });
        } catch (error: any) {
            next(error);
        }
    };
}
