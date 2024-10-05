import { UserModel } from './../modules/users/models/userModel';
import { TokenUtil } from './../modules/common/utils/tokenUtil';
import { Response, NextFunction, RequestHandler } from 'express';
import { customRequest } from '../modules/users/interfaces/request.interface';

export class AuthMiddleware {
    private tokenUtil: TokenUtil;
    private userModel: typeof UserModel;

    constructor(tokenUtil: TokenUtil, userModel: typeof UserModel) {
        this.tokenUtil = tokenUtil;
        this.userModel = userModel;
    }

    // Middleware to authenticate the token
    authenticate: RequestHandler = async (
        req: customRequest,
        res: Response,
        next: NextFunction,
    ) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        try {
            const decoded: any = this.tokenUtil.verifyToken(token);
            const user = await this.userModel.findById(decoded?.id);

            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            req.user = user; // Attach user to request
            next();
        } catch (error: any) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };

    // Middleware for role-based access control
    authorize = (roles: string[]): RequestHandler => {
        return (
            req: customRequest,
            res: Response,
            next: NextFunction,
        ) => {
            const user = req.user;

            if (!user || !roles.includes(user.role)) {
                res.status(403).json({
                    message: 'Forbidden: Insufficient permissions',
                });
                return;
            }

            next();
        };
    };
}
