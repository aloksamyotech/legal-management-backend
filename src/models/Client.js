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
     
    },
    state: {
      type: String,
      
    },
    zipcode: {
      type: Number,
     
    },
    phonenum: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    About: {
      type: String,
    },
    image: {
      type: String,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Client = mongoose.model("Client", ClientSchema);
