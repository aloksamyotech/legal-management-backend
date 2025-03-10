import { User } from "../models/Admin.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import BlockedRole from "../models/Email-Sch.js";
import { sendEmail } from "../core/Nodemailer/nodemailer.js";
import getAccountCreationEmailTemplate from "../core/common/htmlTemplates/accountCreationtemp.js";
export const registerAdmin = async (req) => {
  const companyId = req.user.companyId;
  const {
    Name,
    gender,
    mobileNumber,
    AsignRole,
    email,
    password,
    address,
    permission,
  } = req.body;

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
    companyId: companyId,
    Gender: gender,
    address,
    permission,
    image: req.file ? `/uploads/${req.file.filename}` : null,
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
  const isBlocked = await BlockedRole.findOne({
    role: "Create User",
    companyId,
  });
  if (isBlocked.isBlocked) {
    await sendEmail(
      email,
      "Welcome to Our Company",
      "",
      getAccountCreationEmailTemplate(Name),
    );
  } else {
    console.log("Email not sent as 'User' role is blocked.");
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

export const Companylogo = async (req) => {
  const id  = req.user.companyId;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  // Fetch user details
  const user = await User.findOne({ _id: id, Active: true });

  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  // Fetch company logo based on companyId
  let companyLogo = null;
  if (user?.CompanyLogo) {
    companyLogo = user.CompanyLogo|| null;
  }

  return {companyLogo};
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

export const UpdateUserPermission = async (req) => {
  const { id } = req.params;
  const { permissions } = req.body;
  if (!id || !permissions) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id, Active: true },
    { permission: permissions },
    { new: true },
  ).select("_id Name email permission");

  if (!updatedUser) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedUser;
};

export const UpdateUser = async (req) => {
  const { id } = req.params;
  const { Name, Gender, mobileNumber, AsignRole, email, address, currency } = req.body;

  if (!id) {
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
    email,
    address,
    currency,  
  };
  if (req?.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, Active: true },
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

export const GetAllUsers = async (req) => {
  const users = await User.find({
    Active: true,
    companyId: req.user.companyId,
  }).sort({ createdAt: -1 });

  if (!users || users.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return users;
};

// export const LoginUser = async (req) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, Active: true });
//   if (!user) {
//     throw new CustomError(
//       statusCodes?.notFound,
//       Message?.notFound,
//       errorCodes?.not_found,
//     );
//   }

//   const isPasswordCorrect = await user.isPasswordCorrect(password);
//   if (!isPasswordCorrect) {
//     throw new CustomError(
//       statusCodes?.unauthorized,
//       Message?.invalidCredentials,
//       errorCodes?.invalid_credentials,
//     );
//   }

//   const accessToken = user.generateAccessToken();
//   const refreshToken = user.generateRefreshToken();

//   return { accessToken, refreshToken, user };
// };

// export const RefreshToken = async (req) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     throw new CustomError(
//       statusCodes?.badRequest,
//       Message?.refreshTokenMissing,
//       errorCodes?.bad_request,
//     );
//   }

//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//   const user = await User.findById(decoded._id);
//   if (!user) {
//     throw new CustomError(
//       statusCodes?.unauthorized,
//       Message?.invalidRefreshToken,
//       errorCodes?.invalid_token,
//     );
//   }

//   const newAccessToken = user.generateAccessToken();
//   return { accessToken: newAccessToken };
// };
export const resetPassword = async (req) => {
  const { newPassword } = req.body;
  const id = req.user._id;

  const user = await User.findOne({
    _id: id,
  });
  if (!user) {
    throw new CustomError(
      statusCodes?.unauthorized,
      "Invalid or expired reset token.",
      errorCodes?.invalid_token,
    );
  }

  user.password = newPassword;
  await user.save();

  return user;
};
export const Updatelogo = async (req) => {
  const id = req.user.companyId;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }
  const updateData = {
    CompanyLogo: req.file ? `/uploads/${req.file.filename}` : null,
  };

  const updatedLogo = await User.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedLogo) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedLogo;
};
