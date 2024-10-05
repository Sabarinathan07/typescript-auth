import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    password: string;
    role: string; // Role of the user (e.g., admin, user)
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // Default role is 'user'
});

export const UserModel = mongoose.model<User>("User", UserSchema);
