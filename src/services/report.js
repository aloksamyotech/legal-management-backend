import CaseModel from "../models/Case.js";
import HearingModel from "../models/Hearing.js";
import CustomError from "../utils/exception.js";

export const GetAllHearingRepo = async (req) => {
  const companyId = req.user.companyId;
  const { client, title, startDate, endDate, judgementStatus } = req.query;

  let filterConditions = { Active: true, companyId };

  if (client) {
    filterConditions["Client.Name"] = { $regex: client, $options: "i" };
  }

  if (title) {
    filterConditions["Case.Title"] = { $regex: title, $options: "i" };
  }

  if (judgementStatus) {
    filterConditions["JudgementStatus"] = judgementStatus;
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    filterConditions["Date"] = { $gte: start, $lte: end };
  }

  const allhearings = await HearingModel?.find(filterConditions)
    .populate("Case", "Title")
    .populate("Client", "Name")
    .sort({ createdAt: -1 });

  if (!allhearings || allhearings.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return allhearings;
};
export const GetCaseRepo = async (req) => {
  const { client, caseStatus, caseName, startDate, endDate, timeFilter } =
    req.query;
  const companyId = req.user.companyId;

  let query = { Active: true, companyId };

  if (client) {
    query["Client"] = { $regex: client, $options: "i" }; 
  }

  if (caseStatus) {
    query["CaseStatus"] = caseStatus;
  }

  if (caseName) {
    query["Title"] = { $regex: caseName, $options: "i" }; 
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    query["Date"] = { $gte: start, $lte: end };
  }

  if (timeFilter === "today") {
    const today = new Date();
    query["Date"] = {
      $gte: new Date(today.setHours(0, 0, 0, 0)),
      $lte: new Date(today.setHours(23, 59, 59, 999)),
    };
  } else if (timeFilter === "thisMonth") {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    query["Date"] = {
      $gte: new Date(currentYear, currentMonth, 1),
      $lte: new Date(currentYear, currentMonth + 1, 0, 23, 59, 59),
    };
  }

  const cases = await CaseModel.find(query)
    .populate([
      { path: "Client", select: "Name" },
      { path: "Advocate", select: "name" },
      { path: "Matter", select: "Title" },
      { path: "Judge", select: "Title" },
      { path: "PoliceStation", select: "Title" },
      { path: "Court", select: "Title" },
    ])
    .sort({ createdAt: -1 });

  if (!cases || cases.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return cases;
};
