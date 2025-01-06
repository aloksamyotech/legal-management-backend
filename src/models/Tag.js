import mongoose from "mongoose";
const { Schema } = mongoose;
const TagSchema = new Schema(
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

const TagModel = mongoose.model("Tag", TagSchema);

export default TagModel;
