
import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
});

const NoteSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Attachment: [AttachmentSchema],
    Description: { type: String, required: true },
    CreatedAt: {
        type: Date,
        default: Date.now,
      },
    Active:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
