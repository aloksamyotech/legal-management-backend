import CaseModel from "../models/Case.js";
import { Client as ClientSch } from "../models/Client.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddCase = async (req) => {
  const {
    Title,
    Date,
    Client,
    Advocate,
    Matter,
    Judge,
    PoliceStation,
    Court,
    Fir,
    description,
    internalNote,
  } = req.body;

  if (!Title || !Date || !Client || !Advocate || !Matter || !Judge || !PoliceStation || !Court || !Fir) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request
    );
  }

 
  const clientExists = await ClientSch.findById(Client);
  if (!clientExists) {
    throw new CustomError(
      statusCodes?.notFound,
      "Client does not exist",
      errorCodes?.not_found
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
    Fir,
    description,
    internalNote,
  });

  const createdCase = await newCase.save();

  if (!createdCase) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable
    );
  }

  return createdCase;
};

export const GetCase = async () => {
  const cases = await CaseModel.find().populate("Client");

  if (!cases || cases.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
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
      errorCodes?.bad_request
    );
  }

  if (updateData.Client) {
    const clientExists = await ClientSch.findById(updateData.Client);
    if (!clientExists) {
      throw new CustomError(
        statusCodes?.notFound,
        "Client does not exist",
        errorCodes?.not_found
      );
    }
  }

const updatedCase = await CaseModel.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true }
  ).populate("Client");

  if (!updatedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed
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
      errorCodes?.bad_request
    );
  }

  
  const deletedCase = await CaseModel.findOneAndDelete({ _id: id });

  if (!deletedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found
    );
  }

  return { message: Message?.Delete, case: deletedCase };
};

