import mongoose from "mongoose";
const { Schema } = mongoose;
const MatterSchema = new Schema(
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

const MatterModel = mongoose.model("Matter", MatterSchema);

export default MatterModel;
