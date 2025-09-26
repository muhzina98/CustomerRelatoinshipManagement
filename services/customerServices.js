import { NotFoundError } from "../middlewares/errorMiddleware.js";
import { Customer } from "../models/customerModel.js";

export const createCustomerService = async (data) => {
  try {
    return await Customer.create(data);
  } catch (error) {
    throw error; 
  }
};

export const getCustomerService = async () => {
  try {
    return await Customer.find();
  } catch (error) {
    throw error;
  }
};

export const getCustomerByIdService = async (id) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
    return customer;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerService = async (id, updates) => {
  try {
    const customer = await Customer.findByIdAndUpdate(id, updates, { new: true,runValidators:true });
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
    return customer;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerService = async (id) => {
  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }
    return customer;
  } catch (error) {
    throw error;
  }
};
