import mongoose, { Schema } from "mongoose";
const ClientSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    phonenum: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    image: {
      type: String, 
    },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", ClientSchema);
