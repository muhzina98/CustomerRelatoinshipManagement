import { model, Schema } from "mongoose";

const customerSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    contact_info: {
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true })

export const Customer = model('customer', customerSchema)