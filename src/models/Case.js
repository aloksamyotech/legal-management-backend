import mongoose, { Schema } from "mongoose";

const CaseSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Client: {
      type: Schema.Types.ObjectId,
      ref: "Client", 
      required: true,
    },
    Advocate: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Matter: {
      type: String,
      required: true,
    },
    Judge: {
      type: String,
      required: true,
    },
    PoliceStation: {
      type: String,
      required: true,
    },
    Court: {
      type: String,
      required: true,
    },
    Fir: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    internalNote: {
      type: String,
    },
  },
  { timestamps: true }
);

const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;
