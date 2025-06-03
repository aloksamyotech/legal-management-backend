import Note from "../models/Note.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddNote = async (req) => {
  const { Title, Description, CreatedAt } = req.body;
  const companyId = req.user.companyId;
  if (!Title || !Description) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const files = req.files?.map((file) => ({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
    type: file.mimetype,
  }));

  const newNote = new Note({
    Title,
    Description,
    CreatedAt,
    Attachment: files || [],
    Active: true,
    companyId,
  });

  const createdNote = await newNote.save();

  if (!createdNote) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdNote;
};

export const GetAllNotes = async (req) => {
  const companyId = req.user.companyId;
  const notes = await Note.find({ Active: true, companyId }).sort({
    createdAt: -1,
  });

  if (!notes || notes?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return notes;
};

export const GetNoteById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const note = await Note.findOne({ _id: id, Active: true });

  if (!note) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return note;
};

export const UpdateNote = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const files = req.files?.map((file) => ({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
    type: file.mimetype,
  }));

  if (files) {
    updateData.Attachment = files;
  }

  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedNote) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedNote;
};

export const DeleteNote = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const note = await Note.findOne({ _id: id, Active: true });

  if (!note) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  note.Active = false;
  await note.save();

  return { message: Message?.Delete, note };
};

export const GetAllNotesIndex = async (req) => {
  const companyId = req.user.companyId;
  const { page, limit, search } = req.query;
  const searchCondition = search
    ? { Title: { $regex: search, $options: "i" } }
    : {};

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    throw new CustomError(
      statusCodes?.badRequest,
      "Invalid page number",
      errorCodes?.invalidInput,
    );
  }

  if (isNaN(pageSize) || pageSize <= 0) {
    throw new CustomError(
      statusCodes?.badRequest,
      "Invalid page size",
      errorCodes?.invalidInput,
    );
  }

  const notesQuery = Note.find({
    Active: true,
    companyId,
    ...searchCondition,
  }).sort({ createdAt: -1 });

  const totalNotes = await Note.countDocuments({
    Active: true,
    companyId,
    ...searchCondition,
  });

  const notes = await notesQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!notes || notes?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    notes,
    totalNotes,
    page: pageNumber,
    totalPages: Math.ceil(totalNotes / pageSize),
  };
};
