import jwt from "jsonwebtoken";
import { statusCodes } from "../core/common/constant.js";

export const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(statusCodes.badRequest)
      .json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(statusCodes.badRequest)
      .json({ message: "Unauthorized: Invalid token" });
  }
};
