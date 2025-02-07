import mongoose, { Schema } from "mongoose";
const AdviseSchema = new Schema(
  {
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      trim: true,
    },
    Advocate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advocate",
      required: true,
      trim: true,
    },
    Date: {
      type: Date,
      //required: true,
      default: Date.now(),
    },
    Matter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matter",
      required: true,
      trim: true,
    },
    Fee: {
      type: Number,
      required: true,
      min: 0,
    },
    Status: {
      type: String,
      enum: ["Draft", "Approved", "closed", "On-hold"],
      default: "Draft",
    },
    Active: {
      type: Boolean,
      default: true,
    },
    Payment: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    description: {
      type: String,
      trim: true,
    },
    internalNote: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Advisedb = mongoose.model("Advise", AdviseSchema);
