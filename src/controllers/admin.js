import * as adminService from "../services/admin.js";
import { statusCodes } from "../core/common/constant.js";
const adminRegistration = async (req, res, next) => {
  const adminData = await adminService.registerAdmin(req, res, next);
  res.status(statusCodes?.created).send(adminData);
};
const adminLogin = async (req, res, next) => {
  const data = await adminService.loginAdmin(req, res, next);
  res
    .status(statusCodes?.ok)
    // .cookie("accessToken", data?.accessToken, data?.options)
    // .cookie("refreshToken", data?.refreshToken, data?.options)
    .send({
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      loginadmin: data?.loginadmin,
    });
};
export default {
  adminRegistration,
  adminLogin,
};
