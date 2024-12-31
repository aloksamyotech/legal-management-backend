import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
});

const ExpenseSchema = new mongoose.Schema(
  {
    Title: { type: String,
       required: true },
    Case: { type: String, 
      required: true },
    Type: {
       type: mongoose.Schema.Types.ObjectId,
      ref:"ExpenseType",
       required: true, },
    Amount: { type: Number, 
      required: true },
    Attachment: [AttachmentSchema],
    Description: { type: String },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;
