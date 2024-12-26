import mongoose from "mongoose";
const { Schema } = mongoose;

const JudgeSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    CreatedAt: {
      type: Date,
      default: () => new Date(), 
    },
  },
  {
    timestamps: true, 
  }
);

const JudgeModel = mongoose.model("Judge", JudgeSchema);

export default JudgeModel;
