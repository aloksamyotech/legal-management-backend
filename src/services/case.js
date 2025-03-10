import CaseModel from "../models/Case.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import HearingModel from "../models/Hearing.js";
import Evidence from "../models/Evidence.js";
import Document from "../models/Document.js";
import BlockedRole from "../models/Email-Sch.js";
import { sendEmail } from "../core/Nodemailer/nodemailer.js";
import { Client as ClientModel } from "../models/Client.js";
import { AdvocateSch } from "../models/Advocate.js";
import getCaseConfirmationEmailTemplate from "../core/common/htmlTemplates/clientcaseregistration.js";
import getAppointmentEmailTemplate from "../core/common/htmlTemplates/advocatecaseappoint.js";
export const AddCase = async (req) => {
  const companyId = req.user.companyId;
  const {
    Title,
    Date,
    Client,
    Advocate,
    CaseStatus,
    Matter,
    Judge,
    PoliceStation,
    Court,
    Fir,
    description,
    internalNote,
  } = req.body;

  if (
    !Title ||
    !Date ||
    !Client ||
    !Advocate ||
    !Matter ||
    !Judge ||
    !PoliceStation ||
    !Court ||
    !Fir
  ) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const clientData = await ClientModel.findById(Client).select("Name Email");
  const advocateData =
    await AdvocateSch.findById(Advocate).select("name email");

  if (!clientData || !advocateData) {
    throw new CustomError(
      statusCodes?.notFound,
      "Client or Advocate not found",
      errorCodes?.not_found,
    );
  }

  const newCase = new CaseModel({
    Title,
    Date,
    Client,
    Advocate,
    Matter,
    Judge,
    PoliceStation,
    Court,
    CaseStatus,
    Fir,
    description,
    internalNote,
    Active: true,
    companyId,
  });

  const createdCase = await newCase.save();

  if (!createdCase) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  if (createdCase) {
    const blockedRoles = await BlockedRole.find({ companyId });
    const isClientBlocked = blockedRoles.some(
      (role) => role?.role === "client" && role?.isBlocked,
    );
    const isAdvocateBlocked = blockedRoles.some(
      (role) => role?.role === "advocate" && role?.isBlocked,
    );

    // Send email to Advocate
    if (isAdvocateBlocked && advocateData.email) {
      await sendEmail(
        advocateData.email,
        "Appointed as Advocate",
        "",
        getAppointmentEmailTemplate(advocateData.name, clientData.Name, Title),
      );
    }

    if (isClientBlocked && clientData.Email) {
      await sendEmail(
        clientData.Email,
        "Your Case Has Been Registered",
        "",
        getCaseConfirmationEmailTemplate(clientData.Name, Title),
      );
    }
  }
  return createdCase;
};

export const GetCase = async (req) => {
  const companyId = req.user.companyId;
  const cases = await CaseModel.find({ Active: true, companyId })
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

export const UpdateCase = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedCase = await CaseModel.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedCase;
};

export const DeleteCase = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const deletedCase = await CaseModel.findOneAndUpdate(
    { _id: id, Active: true },
    { Active: false },
    { new: true },
  );

  if (!deletedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }
  await Promise.all([
    HearingModel.updateMany({ Case: id, Active: true }, { Active: false }),
    Evidence.updateMany({ Case: id, Active: true }, { Active: false }),
    Document.updateMany({ Case: id, Active: true }, { Active: false }),
  ]);
  return { message: Message?.Delete, case: deletedCase };
};
export const GetCaseById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const caseData = await CaseModel.findOne({ _id: id, Active: true }).populate([
    { path: "Client", select: "Name" },
    { path: "Advocate", select: "name" },
    { path: "Matter", select: "Title" },
    { path: "Judge", select: "Title" },
    { path: "PoliceStation", select: "Title" },
    { path: "Court", select: "Title" },
  ]);

  if (!caseData) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return caseData;
};
