import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const EvidenceSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Case: { type: mongoose.Schema.Types.ObjectId,
     ref: "Case", 
     required: true },
  Hearing: { type: mongoose.Schema.Types.ObjectId, 
    ref: "Hearing", 
    required: true },
  Favor: {
    type: String,
    required: true,
  },
  Attachment: [AttachmentSchema],
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  Description: {
    type: String,
    required: true,
  },
  Active:{
    type:Boolean,
    default:true,
  }
});

const Evidence = mongoose.model("Evidence", EvidenceSchema);

export default Evidence;
