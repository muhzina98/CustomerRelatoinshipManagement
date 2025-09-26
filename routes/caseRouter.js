import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  deleteCase,
} from "../controllers/caseController.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// CRUD routes
router.post("/", authorizeRoles("admin", "user"), createCase);
router.get("/", authorizeRoles("admin", "user"), getCases);
router.get("/:id", authorizeRoles("admin", "user"), getCaseById);
router.patch("/update/:id", authorizeRoles("admin", "user"), updateCase);
router.delete("/delete/:id", authorizeRoles("admin"), deleteCase);

export default router;
