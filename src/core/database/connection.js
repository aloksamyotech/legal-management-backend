import mongoose from "mongoose";
import { database_urls } from "../common/constant.js";
import "dotenv/config";
import { User } from "../../models/Admin.js";

const connectDB = async () => {
  try {
    (async function () {
      const dbUri = database_urls.connection + database_urls.db_name;
      const dbconnect = await mongoose.connect(dbUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      });
      if (dbconnect) {
        const existingAdmin = await User.findOne({
          email: "admin@gmail.com",
        });
        if (!existingAdmin) {
          const userData = new User({
            Name: "Admin",
            gender: "Male",
            mobileNumber: "1234567890",
            email: "admin@gmail.com",
            password: "admin123",
            AsignRole: "Admin",
            address: "USA",
            permission: [
              "dashboard",
              "advocate",
              "users",
              "logged history",
              "client",
              "advice",
              "cases",
              "contact management",
              "hearing",
              "invoice",
              "evidence",
              "document",
              "expense",
              "notes",
              "case stage",
              "court",
              "police station",
              "matter",
              "practice area",
              "tag",
              "judge",
              "expense type",
              "reports",
            ],
          });
          await userData.save();
          console.log(`New Admin is Created`);
        }
      }
    })();
  } catch (error) {
    console.error("database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
