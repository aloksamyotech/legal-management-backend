import mongoose from "mongoose";

const InvoiceHearing = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hearing",
  },
  amount: { type: Number, required: true },
  notes: { type: String },
});
const ExtraExpenseInvoice = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: { type: Number, required: true },
  notes: { type: String },
});

const InvoiceSchema = new mongoose.Schema(
  {
    InvoiceNo: {
      type: String,
      required: true,
    },
    Case: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true },
    Advocate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advocate",
      required: true,
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    hearings: [InvoiceHearing],
    extraExpenses: [ExtraExpenseInvoice],
    date: {
      type: Date,
      default: Date.now,
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    PaymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    Active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
