import mongoose from "mongoose";
const { Schema } = mongoose;
const CaseStageSchema = new Schema(
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

const CaseStageModel = mongoose.model("CaseStage", CaseStageSchema);

export default CaseStageModel;
