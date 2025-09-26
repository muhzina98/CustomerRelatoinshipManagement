import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { User } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // Make sure environment variables are loaded

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Get all users
export const getUsersService = async () => {
  const users = await User.find().select("-password_hash"); // exclude password_hash
  return users;
};

// Register user
export const registerUserService = async ({ username, password, role }) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password_hash: hashedPassword, role });

  const { password_hash, ...userData } = user.toObject();
  return { success: true, data: userData };
};

// Login user
export const loginUserService = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) return { success: false, message: "Invalid credentials", data: null };

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return { success: false, message: "Invalid credentials", data: null };

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password_hash, ...userData } = user.toObject();

  return { success: true, message: "Login successful", data: userData, token };
};
