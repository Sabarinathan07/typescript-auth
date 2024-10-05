import { HashUtil } from '../../common/utils/hashUtil';
import { TokenUtil } from '../../common/utils/tokenUtil';
import { User } from '../models/userModel';
import { UserRepository } from '../repositories/userRepository';

export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private tokenUtil: TokenUtil,
        private hashUtil: HashUtil,
    ) {}

    async register(username: string, password: string) {
        const hashedPassword = await this.hashUtil.hashPassword(
            password,
        );
        const user: Partial<User> = {
            username,
            password: hashedPassword,
            role: 'user', // Default role
            // Add other default values if necessary
        };
        return await this.userRepository.createUser(user);
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findByUsername(
            username,
        );
        if (!user) throw new Error('User not found');

        const validPassword = await this.hashUtil.comparePasswords(
            password,
            user.password,
        );
        if (!validPassword) throw new Error('Invalid credentials');

        const accessToken = this.tokenUtil.generateAccessToken(
            user.id,
        );
        const refreshToken = this.tokenUtil.generateRefreshToken(
            user.id,
        );

        return { accessToken, refreshToken };
    }
}
