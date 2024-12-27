import mongoose from "mongoose";
const { Schema } = mongoose;
const ExpenseTypeSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
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

const ExpenseTypeModel = mongoose.model("ExpenseType", ExpenseTypeSchema);

export default ExpenseTypeModel;
