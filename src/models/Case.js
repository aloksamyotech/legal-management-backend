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
      ref: "Advocate",
      required: true,
    },
    Matter: {
      type: Schema.Types.ObjectId,
      ref: "Matter",
      required: true,
    },
    Judge: {
      type: Schema.Types.ObjectId,
      ref: "Judge",
      required: true,
    },
    PoliceStation: {
      type: Schema.Types.ObjectId,
      ref: "Policestation",
      required: true,
    },
    Court: {
      type: Schema.Types.ObjectId,
      ref: "Court",
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
    Active:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true },
);

const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;
