import { User, UserModel } from '../models/userModel';

export class UserRepository {
    async createUser(user: Partial<User>): Promise<User> {
        const newUser = new UserModel({
            ...user,
            role: user.role || 'user', // Default role
        });
        return await newUser.save();
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ username }).exec();
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw new Error('Database query failed');
        }
    }
}
