import { AuthMiddleware } from './middleware/authMiddleware';
import { HashUtil } from './modules/common/utils/hashUtil';
import { TokenUtil } from './modules/common/utils/tokenUtil';
import { AuthService } from './modules/users/services/authService';
import { AuthController } from './modules/users/controllers/authController';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './modules/common/database/connect';
import { UserRepository } from './modules/users/repositories/userRepository';
import userRouter from './modules/users/routes/api/user.routes';
import { UserModel } from './modules/users/models/userModel';

dotenv.config(); // Load .env file

const app = express();
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET || 'secret';
app.use(cookieParser(jwtSecret));

const userRepository = new UserRepository();
const tokenUtil = new TokenUtil();
const hashUtil = new HashUtil();
const authService = new AuthService(
    userRepository,
    tokenUtil,
    hashUtil,
);
const authController = new AuthController(authService, tokenUtil);
const authMiddleware = new AuthMiddleware(tokenUtil, UserModel);

// MongoDB Connection
connectDB();

// Routes
app.post('/register', (req, res) =>
    authController.register(req, res),
);
app.post('/login', (req, res) => authController.login(req, res));

// Refresh token route
app.post('/refresh-token', authController.refreshToken);

app.use('/api', userRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
