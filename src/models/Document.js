import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
});

const DocumentSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Case: { type: String, required: true },
    Attachment: [AttachmentSchema],
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
    Note: { type: String, required: true },
    Active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
