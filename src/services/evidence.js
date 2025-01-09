import Evidence from "../models/Evidence.js";
import { statusCodes, Message, errorCodes } from "../core/common/constant.js";

export const AddEvidence = async (req, res) => {
  const { Title, Case, Hearing, Favor, Description } = req?.body;

  const files = req?.files?.map((file) => ({
    name: file?.originalname,
    url: `/uploads/${file?.filename}`,
    type: file?.mimetype,
  }));

  const evidence = new Evidence({
    Title,
    Case,
    Hearing,
    Favor,
    Attachment: files || [],
    Description,
  });

  const createdEvidence = await evidence.save();
  return createdEvidence;
};
export const GetEvidence = async (req) => {
  const evidence = await Evidence?.find({ Active: true })
    .populate("Case")
    .populate("Hearing")
    .sort({ createdAt: -1 });

  if (!evidence || evidence.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return evidence;
};
export const DeleteEvidence = async (req, res) => {
  const { id } = req.params;

  const deletedEvidence = await Evidence.findOneAndUpdate(
    { _id: id, Active: true },
    { Active: false },
    { new: true },
  );

  if (!deletedEvidence) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  return deletedEvidence;
};

export const UpdateEvidence = async (req, res) => {
  const { id } = req?.params;
  const { Title, Case, Hearing, Favor, Description } = req?.body;

  const files = req.files?.map((file) => ({
    name: file.originalname,
    url: `/uploads/${file?.filename}`,
    type: file.mimetype,
  }));

  const updatedData = {
    Title,
    Case,
    Hearing,
    Favor,
    Attachment: files,
    Description,
  };

  const updatedEvidence = await Evidence.findOneAndUpdate(
    { _id: id, Active: true },
    updatedData,
    { new: true },
  );

  if (!updatedEvidence) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.not_found,
    );
  }

  return updatedEvidence;
};
export const GetEvidenceByCase = async (req, res) => {
  const { caseId } = req.params;

  const evidence = await Evidence.find({ Case: caseId, Active: true }).populate(
    "Hearing",
    "Title",
  );

  if (!evidence || evidence.length === 0) {
    return {
      status: statusCodes?.notFound,
      message: Message?.notFound,
      errorCode: errorCodes?.not_found,
      evidence: [],
    };
  }

  return evidence;
};
export const GetEvidenceById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const evidence = await Evidence.findOne({ _id: id, Active: true }).populate([
    { path: "Case", select: "Title" },
    { path: "Hearing", select: "Title" },
  ]);

  if (!evidence) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return evidence;
};
