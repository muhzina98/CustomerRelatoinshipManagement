import express from "express";
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from "../controllers/customerController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

// CRUD operations
router.post("/", authorizeRoles("admin", "user"), createCustomer);
router.get("/", authorizeRoles("admin", "user"), getCustomers);
router.get("/:id", authorizeRoles("admin", "user"), getCustomerById);
router.patch("/update/:id", authorizeRoles("admin"), updateCustomer);
router.delete("/delete/:id", authorizeRoles("admin"), deleteCustomer);

export default router;
