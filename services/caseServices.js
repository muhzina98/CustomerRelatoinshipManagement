import mongoose from "mongoose";
import { Case } from "../models/caseModel.js";
import { Customer } from "../models/customerModel.js";
import { User } from "../models/userModel.js";
import { ValidationError, NotFoundError } from "../middlewares/errorMiddleware.js";

export const createCaseService = async ({ customer_id, assigned_to, priority, status }) => {
  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(customer_id))
    throw new ValidationError("Invalid customer_id");

  const customer = await Customer.findById(customer_id);
  if (!customer) throw new NotFoundError("Customer not found");

  if (assigned_to) {
    if (!mongoose.Types.ObjectId.isValid(assigned_to))
      throw new ValidationError("Invalid assigned_to");
    const user = await User.findById(assigned_to);
    if (!user) throw new NotFoundError("Assigned user not found");
  }

  // Normalize enums
  const validPriorities = ["low", "medium", "high", "urgent"];
  const validStatuses = ["open", "in_progress", "closed"];

  const casePriority = priority?.toLowerCase() || "low";
  const caseStatus = status?.toLowerCase() || "open";

  if (!validPriorities.includes(casePriority))
    throw new ValidationError("Invalid priority");
  if (!validStatuses.includes(caseStatus))
    throw new ValidationError("Invalid status");

  // Create Case
  const newCase = await Case.create({
    customer_id,
    assigned_to: assigned_to || null,
    priority: casePriority,
    status: caseStatus,
  });

  return newCase;
};

// Get all cases
export const getCasesService = async () => {
  return await Case.find()
   
};

// Get case by ID
export const getCaseByIdService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ValidationError("Invalid case ID");

  const singleCase = await Case.findById(id)
   

  if (!singleCase) throw new NotFoundError("Case not found");
  return singleCase;
};

// Update case
export const updateCaseService = async (id, updates) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ValidationError("Invalid case ID");

  if (updates.assigned_to) {
    if (!mongoose.Types.ObjectId.isValid(updates.assigned_to))
      throw new ValidationError("Invalid assigned_to ID");
    const user = await User.findById(updates.assigned_to);
    if (!user) throw new NotFoundError("Assigned user not found");
  }

  // Normalize enums
  const validPriorities = ["low", "medium", "high", "urgent"];
  const validStatuses = ["open", "in_progress", "closed"];

  if (updates.priority && !validPriorities.includes(updates.priority.toLowerCase()))
    throw new ValidationError("Invalid priority");

  if (updates.status && !validStatuses.includes(updates.status.toLowerCase()))
    throw new ValidationError("Invalid status");

  const updatedCase = await Case.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedCase) throw new NotFoundError("Case not found");
  return updatedCase;
};

// Delete case
export const deleteCaseService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ValidationError("Invalid case ID");

  const deletedCase = await Case.findByIdAndDelete(id);
  if (!deletedCase) throw new NotFoundError("Case not found");

  return deletedCase;
};
 