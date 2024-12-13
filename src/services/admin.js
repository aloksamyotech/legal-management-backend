import { Admin } from "../models/Admin.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const registerAdmin = async (req) => {
  const { Name, mobileNumber, AsignRole, email, password } = req.body;
  const isAdminAlreadyExist = await Admin.findOne({ email });

  if (isAdminAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const admin = await Admin.create({
    Name,
    mobileNumber,
    AsignRole,
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken ",
  );

  if (!createdAdmin) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdAdmin;
};

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new CustomError(
      statusCodes?.internalServerError,
      "Something went wrong while generating refresh and access tokens.",
      errorCodes?.server_error,
    );
  }
};
export const loginAdmin = async (req) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  const passwordVerify = await admin.isPasswordCorrect(password);

  if (!passwordVerify) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.invalid_credentials,
    );
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
  );
  const loginadmin = await Admin.findById(admin._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return {
    accessToken,
    refreshToken,
    options,
    loginadmin,
  };
};
