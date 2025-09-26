import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

// Protect middleware (JWT authentication)
export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader &&authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password_hash");
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Not authorized, token invalid" });
  }
};

// Optional role-based middleware
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Not authorized" });
  if (!roles.includes(req.user.role))
    return res.status(403).json({ success: false, error: "Forbidden: insufficient permissions" });
  next();
};
