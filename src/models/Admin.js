import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    AsignRole: {
      type: String,
      enum: ["Admin", "Manager", "Company", "Staff" , 'Advocate', 'Client' ],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    permission: {
      type: [],
      default: ["dashboard"],
    },

    Active: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    permission: this.permission,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
UserSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
export const User = mongoose.model("User", UserSchema);
