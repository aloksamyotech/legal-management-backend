import mongoose from "mongoose";
const { Schema } = mongoose;
const HearingSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Fee: {
      type: Number,
      required: true,
      min: 0,
    },
    Witness: {
      type: String,
      required: false,
      trim: true,
    },
    JudgementStatus: {
      type: String,
      required: false,
      enum: ["Pending", "In Progress", "Delivered"],
      default: "Pending",
    },
    Date: {
      type: Date,
      required: true,
    },
    JudgementReason: {
      type: String,
      required: false,
      trim: true,
    },
    Description: {
      type: String,
      required: false,
      trim: true,
    },
    Case: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    
    Active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

HearingSchema.index({ Title: 1 });
HearingSchema.index({ Date: 1 });

const HearingModel = mongoose.model("Hearing", HearingSchema);

export default HearingModel;
