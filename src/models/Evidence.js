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
  Case: {
    type: String,
    required: true,
  },
  Hearing: {
    type: String,
    required: true,
  },
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
});

const Evidence = mongoose.model("Evidence", EvidenceSchema);

export default Evidence;
