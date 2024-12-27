import Evidence from "../models/Evidence.js";
import { statusCodes, Message } from "../core/common/constant.js";

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

export const GetEvidence = async (req, res) => {
  const evidence = await Evidence.find();
  res?.status(statusCodes?.ok).send(evidence);
};

export const UpdateEvidence = async (req, res) => {
  const { id } = req?.params;
  const { Title, Case, Hearing, Favor, Description } = req?.body;

  // Handle files
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
  const updatedEvidence = await Evidence.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedEvidence;
};

export const DeleteEvidence = async (req, res) => {
  const { id } = req.params;
  const deletedEvidence = await Evidence.findByIdAndDelete(id);
  if (!deletedEvidence) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }
  return deletedEvidence;
};
