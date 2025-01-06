import mongoose from "mongoose";
const { Schema } = mongoose;
const AdvocateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    certificate: {
      type: String,
      trim: true,
    },
    barNumber: {
      type: String,
      required: true,
    },
    lawUniversity: {
      type: String,
    },
    graduationYear: {
      type: String,
    },
    practiceArea: {
      type: String,
    },
    languages: {
      type: String,
    },
    skill: {
      type: String,
    },
    degree: {
      type: String,
    },
    notes: {
      type: String,
    },
    firms: {
      type: String,
    },
    position: {
      type: String,
    },
    duration: {
      type: String,
    },
    image: {
      type: String,
    },
    About: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const AdvocateSch = mongoose.model("Advocate", AdvocateSchema);
