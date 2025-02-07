import * as adminService from "../services/admin.js";
import { statusCodes } from "../core/common/constant.js";

const adminRegistration = async (req, res, next) => {
  const adminData = await adminService.registerAdmin(req, res, next);
  res.status(statusCodes?.created).send(adminData);
};

const userFetch = async (req, res, next) => {
  const userData = await adminService.GetAllUsers(req, res, next);
  res.status(statusCodes?.ok).send(userData);
};
const userFetchbyId = async (req, res, next) => {
  const userData = await adminService.GetUser(req, res, next);
  res.status(statusCodes?.ok).send(userData);
};
const deleteuserbyId = async (req, res, next) => {
  const userData = await adminService.DeleteUser(req, res, next);
  res.status(statusCodes?.ok).send(userData);
};
const userUpdate = async (req, res, next) => {
  const userUpdateData = await adminService.UpdateUser(req, res, next);
  res.status(statusCodes?.ok).send(userUpdateData);
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
const permissionUpdate = async (req, res, next) => {
  const permissionUpdateData = await adminService.UpdateUserPermission(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(permissionUpdateData);
};

export default {
  adminRegistration,
  adminLogin,
  userFetch,
  userFetchbyId,
  deleteuserbyId,
  permissionUpdate,
  userUpdate
};
