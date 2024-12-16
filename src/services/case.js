import CaseModel from "../models/Case.js";
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

  if (!Title || !Date || !Client || !Advocate || !Matter||!Judge||!PoliceStation||!Court||!Fir) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request
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


export const GetAllCases = async () => {
    const cases = await CaseModel.find();
  
    if (!cases || cases.length === 0) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_found
      );
    }
  
    return cases;
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
  
    const deletedCase = await Case.findOneAndDelete({ _id: id });
  
    if (!deletedCase) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notDeleted,
        errorCodes?.not_found
      );
    }
  
    return { message: Message?.Delete, case: deletedCase };
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
  
    const updatedCase = await Case.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
  
    if (!updatedCase) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notUpdate,
        errorCodes?.action_failed
      );
    }
  
    return updatedCase;
  };
  