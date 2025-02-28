import { statusCodes } from "../core/common/constant.js";
import { getAiresponse } from "../services/askAI.js";

export const getAiReportData = async (req, res) => {
  console.log("nside api");
  try {
    const result = await getAiresponse(req);
    res.status(statusCodes.ok).json({
      success: true,
      data: result.data,
      message: result.data.response,
    });
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      success: false,
      message: messages.fetching_failed,
    });
  }
};
