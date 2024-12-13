import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const AdminSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    AsignRole:{
        type:String,
        enum:["admin", "manager","company"],
        required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    companyId:{
      Type:mongoose.Types.ObjectId,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

AdminSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
AdminSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
export const Admin = mongoose.model("Admin", AdminSchema);
