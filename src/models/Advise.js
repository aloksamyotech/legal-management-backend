import mongoose, { Schema } from "mongoose";
const AdviseSchema = new Schema(
      {
        Client: {
          type: String,
          required: true,
          trim: true,
        },
        Advocate: {
          type: String,
          required: true, 
          trim: true,
        },
        Date: {
          type: Date,
          required: true, 
        },
        Matter: {
          type: String,
          required: true, 
          trim: true,
        },
        Fee: {
          type: Number,
          required: true, 
          min: 0, 
        },
        Status: {
          type: String,
          enum: ["Approved", "closed", "On-hold"], 
          default: "On-hold", 
        },
        description: {
          type: String,
          trim: true,
        },
        internalNote: {
          type: String,
          trim: true,
        },
      },
      { timestamps: true }
    );
       

export const Advisedb = mongoose.model("Advise", AdviseSchema);
