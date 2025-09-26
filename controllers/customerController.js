import { asyncHandler } from "../middlewares/asyncHandler.js";
import { sendSuccess } from "../middlewares/errorMiddleware.js";
import { createCustomerService, deleteCustomerService, getCustomerByIdService, getCustomerService, updateCustomerService } from "../services/customerServices.js";

export const createCustomer= asyncHandler(async (req, res) => {
  const customer = await createCustomerService(req.body);
  sendSuccess(res, customer, 201);
})

export const getCustomers =asyncHandler( async (req, res) => {
  const customers = await getCustomerService();
  sendSuccess(res, customers);
})

export const getCustomerById = asyncHandler(async (req, res) => {
    const {id}=req.params
  const customer = await getCustomerByIdService(id);
  sendSuccess(res, customer);
})

export const updateCustomer = asyncHandler(async (req, res) => {
    const {id}=req.params
    const update= req.body;
  
    
  const customer = await updateCustomerService(id, update);
sendSuccess(res, customer, "Customer updated successfully", 200);
})



  

export const deleteCustomer = asyncHandler(async (req, res) => {
    const {id}=req.params
  const customer = await deleteCustomerService(id);
  sendSuccess(res, customer,"Customer delete Successfully");
})
