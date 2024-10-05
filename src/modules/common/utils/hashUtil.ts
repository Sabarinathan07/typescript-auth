import bcrypt from "bcrypt";

export class HashUtil {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
