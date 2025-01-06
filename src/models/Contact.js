import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  Message:{
    type: String
  },
  subject:{
    type:String,

  },
  Active:{
    type:Boolean,
    default:true,
  }
},{
  timestamps:true
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
