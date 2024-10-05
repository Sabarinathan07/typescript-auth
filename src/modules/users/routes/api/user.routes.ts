import { Router, Response, RequestHandler } from 'express';
import { TokenUtil } from './../../../../modules/common/utils/tokenUtil';
import { UserModel } from './../../../../modules/users/models/userModel';
import { AuthMiddleware } from './../../../../middleware/authMiddleware';
import { customRequest } from '../../interfaces/request.interface';

class UserRoutes {
    public router: Router;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        const tokenUtil = new TokenUtil();
        this.authMiddleware = new AuthMiddleware(
            tokenUtil,
            UserModel,
        );
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            '/profile',
            this.authMiddleware.authenticate,
            this.getProfile as RequestHandler,
        );
        this.router.get(
            '/admin',
            this.authMiddleware.authenticate,
            this.authMiddleware.authorize(['admin']),
            this.getAdmin as RequestHandler,
        );
    }

    private getProfile: RequestHandler = (
        req: customRequest,
        res: Response,
    ) => {
        res.json({
            message: `Welcome, ${req.user?.username}. This is your profile.`,
        });
    };

    private getAdmin: RequestHandler = (
        req: customRequest,
        res: Response,
    ) => {
        res.json({ message: `Welcome Admin: ${req.user?.username}` });
    };
}

export default new UserRoutes().router;
