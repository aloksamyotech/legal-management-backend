import BlockedRole from "../models/Email-Sch.js";

import { statusCodes, errorCodes, Message } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const getBlockmail = async (req) => {
  const companyId = req.user._id;
  const blockedRoles = await BlockedRole.find({ companyId });
  if (!blockedRoles || blockedRoles.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return blockedRoles;
};

export const toggerRole = async (req) => {
  const { role, isBlocked } = req.body;
  const companyId = req.user._id;
  let blockedRole = await BlockedRole.findOne({ role, companyId });

  if (blockedRole) {
    blockedRole.isBlocked = isBlocked;
  } else {
    blockedRole = new BlockedRole({ role, isBlocked, companyId });
  }

  await blockedRole.save();
  return blockedRole;
};
