import mongoose from "mongoose";
const { Schema } = mongoose;
const PracticeSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
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
  },
);

const PracticeModel = mongoose.model("Practicearea", PracticeSchema);
export default PracticeModel;
