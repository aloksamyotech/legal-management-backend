import mongoose from "mongoose";
const { Schema } = mongoose;
const CourtSchema = new Schema(
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

const CourtModel = mongoose.model("Court", CourtSchema);
export default CourtModel;
