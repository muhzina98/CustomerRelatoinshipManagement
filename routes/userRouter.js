import express from "express";
import { getUsers, registerUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
