import mongoose from "mongoose";
const { Schema } = mongoose;
const PolicestationSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Location: {
      type: String,
      trim: true,
    },
    Contact: {
      type: Number,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const PolicestationModel = mongoose.model("Policestation", PolicestationSchema);
export default PolicestationModel;
