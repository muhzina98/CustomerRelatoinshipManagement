import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ["admin", "agent", "user"], default: "user" },
  },
  { timestamps: true }
);

export const User = model('user', userSchema)