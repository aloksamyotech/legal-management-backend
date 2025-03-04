import * as emailService from "../services/Emailblocked.js";
import { statusCodes } from "../core/common/constant.js";
const toggleEmail = async (req, res, next) => {
  const blockRole = await emailService.toggerRole(req, res, next);
  res.status(statusCodes?.ok).send(blockRole);
};
const BlockedRoleFetch = async (req, res, next) => {
  const BlockedRole = await emailService.getBlockmail(req, res, next);
  res.status(statusCodes?.ok).send(BlockedRole);
};
export default {
  toggleEmail,
  BlockedRoleFetch,
};
