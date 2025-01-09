import { AdvocateSch } from "../models/Advocate.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import CaseModel from "../models/Case.js";

// Create an Advocate
export const AddAdvocate = async (req) => {
  const {
    name,
    email,
    phone,
    gender,
    city,
    state,
    zipCode,
    country,
    address,
    barNumber,
    lawUniversity,
    graduationYear,
    practiceArea,
    languages,
    skill,
    degree,
    notes,
    firms,
    position,
    duration,
    About,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !city ||
    !state ||
    !zipCode ||
    !country ||
    !barNumber
  ) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }
  const image =
    req.files && req.files.image
      ? `/uploads/${req.files.image[0].filename}`
      : null;
  const certificate =
    req.files && req.files.certificate
      ? `/uploads/${req.files.certificate[0].filename}`
      : null;

  const newAdvocate = new AdvocateSch({
    certificate,
    name,
    email,
    phone,
    gender,
    city,
    state,
    zipCode,
    country,
    address,
    barNumber,
    lawUniversity,
    graduationYear,
    practiceArea,
    languages,
    skill,
    degree,
    notes,
    firms,
    position,
    duration,
    image,
    About,
    active: true,
  });

  const createdAdvocate = await newAdvocate.save();

  if (!createdAdvocate) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdAdvocate;
};

export const GetAllAdvocates = async () => {
  const advocates = await AdvocateSch.find({ active: true }).sort({
    createdAt: -1,
  });

  if (!advocates || advocates.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return advocates;
};

export const GetAdvocateById = async (req) => {
  const { id } = req?.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const advocate = await AdvocateSch.findOne({ _id: id, active: true });

  if (!advocate) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return advocate;
};

export const UpdateAdvocate = async (req) => {
  const {
    certificate,
    name,
    email,
    phone,
    gender,
    city,
    state,
    zipCode,
    country,
    address,
    barNumber,
    lawUniversity,
    graduationYear,
    practiceArea,
    languages,
    skill,
    degree,
    notes,
    firms,
    position,
    duration,
    image,
    About,
  } = req?.body;

  if (!email) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }
  const updateData = {
    certificate,
    name,
    email,
    phone,
    gender,
    city,
    state,
    zipCode,
    country,
    address,
    barNumber,
    lawUniversity,
    graduationYear,
    practiceArea,
    languages,
    skill,
    degree,
    notes,
    firms,
    position,
    duration,
    About,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  };

  const updatedAdvocate = await AdvocateSch.findOneAndUpdate(
    { email: email, active: true },
    updateData,
    { new: true },
  );

  if (!updatedAdvocate) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedAdvocate;
};

export const DeleteAdvocate = async (req) => {
  const { id } = req?.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const advocate = await AdvocateSch.findOne({ _id: id, active: true });

  if (!advocate) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  advocate.active = false;
  await advocate.save();

  return { message: Message?.Delete, advocate };
};
export const GetCaseByAdvocate = async (req) => {
  const { advocateId } = req.params;

  const cases = await CaseModel.find({
    Advocate: advocateId,
    Active: true,
  }).populate([
    { path: "Client", select: "Name" },
    { path: "Matter", select: "Title" },
    { path: "Judge", select: "Title" },
    { path: "PoliceStation", select: "Title" },
    { path: "Court", select: "Title" },
  ]);

    if (!cases || cases.length === 0) {
      return {
        status: statusCodes?.notFound,
        message: Message?.notFound,
        errorCode: errorCodes?.not_found,
        cases: [],
      };
    }

    return cases;
  }
