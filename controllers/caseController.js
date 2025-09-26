import { asyncHandler } from "../middlewares/asyncHandler.js";
import { sendSuccess } from "../middlewares/errorMiddleware.js";
import {
  createCaseService,
  getCasesService,
  getCaseByIdService,
  updateCaseService,
  deleteCaseService,
} from "../services/caseServices.js";

// Create case
export const createCase = asyncHandler(async (req, res) => {
  const newCase = await createCaseService(req.body);
  sendSuccess(res, newCase, 201);
});

// Get all cases
export const getCases = asyncHandler(async (req, res) => {
  const cases = await getCasesService();
  sendSuccess(res, cases);
});

// Get case by ID
export const getCaseById = asyncHandler(async (req, res) => {
  const singleCase = await getCaseByIdService(req.params.id);
  sendSuccess(res, singleCase);
});

// Update case
export const updateCase = asyncHandler(async (req, res) => {
  const updatedCase = await updateCaseService(req.params.id, req.body);
  sendSuccess(res, updatedCase);
});

// Delete case
export const deleteCase = asyncHandler(async (req, res) => {
  const deletedCase = await deleteCaseService(req.params.id);
  sendSuccess(res, deletedCase);
});
