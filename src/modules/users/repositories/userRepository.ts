import { User, UserModel } from '../models/userModel';

export class UserRepository {
    private users: User[] = [];

    async createUser(user: Partial<User>): Promise<User> {
        // Assuming you have a User model with a create method
        const newUser = new UserModel({
            ...user,
            role: user.role || 'user', // Default role
            // Add other default values if necessary
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
