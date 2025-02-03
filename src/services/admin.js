import { User } from "../models/Admin.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const registerAdmin = async (req) => {
  const { Name, Gender, mobileNumber, AsignRole, email, password, companyId, address, permission} = req.body;
  const isUserAlreadyExist = await User.findOne({ email });

  if (isUserAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const user = await User.create({
    Name,
    mobileNumber,
    AsignRole,
    email,
    password,
    Gender,
    companyId,
    address,
    permission
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken ",
  );

  if (!createdUser) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdUser;
};

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await User.findById(adminId);
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

  const admin = await User.findOne({ email });
  if (!admin) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.user_not_found,
      errorCodes?.user_not_found,
    );
  }

  const passwordVerify = await admin.isPasswordCorrect(password);

  if (!passwordVerify) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.wrongPassword,
      errorCodes?.password_mismatch,
    );
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
  );
  const loginadmin = await User.findById(admin._id).select(
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

export const GetUser = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const user = await User.findOne({ _id: id, Active: true });
  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return user;
};


export const DeleteUser = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const user = await User.findOne({ _id: id, Active: true });

  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  user.Active = false;
  await user.save();

  return { message: Message.Delete, user };
};


export const UpdateUser = async (req) => {
  const { Name, Gender, mobileNumber, AsignRole, email, password, companyId, address, permission } = req.body;

  if (!email) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updateData = {
    Name,
    Gender,
    mobileNumber,
    AsignRole,
    password,
    companyId,
    address,
    permission,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10); 
  }

  const updatedUser = await User.findOneAndUpdate(
    { email, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedUser) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedUser;
};


export const GetAllUsers = async () => {
  const users = await User.find({ Active: true }).sort({ createdAt: -1 });

  if (!users || users.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return users;
};


export const LoginUser = async (req) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, Active: true });
  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      statusCodes?.unauthorized,
      Message?.invalidCredentials,
      errorCodes?.invalid_credentials,
    );
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken, user };
};


export const RefreshToken = async (req) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.refreshTokenMissing,
      errorCodes?.bad_request,
    );
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new CustomError(
      statusCodes?.unauthorized,
      Message?.invalidRefreshToken,
      errorCodes?.invalid_token,
    );
  }

  const newAccessToken = user.generateAccessToken();
  return { accessToken: newAccessToken };
};
