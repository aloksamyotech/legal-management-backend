import * as noteService from "../services/note.js";
import { statusCodes } from "../core/common/constant.js";
const NoteAdd = async (req, res, next) => {
  const NoteData = await noteService.AddNote(req, res, next);
  res.status(statusCodes?.created).send(NoteData);
};
const NoteFetch = async (req, res, next) => {
  const NoteData = await noteService.GetAllNotes(req, res, next);
  res.status(statusCodes?.ok).send(NoteData);
};
const NoteById = async (req, res, next) => {
  const NoteData = await noteService.GetNoteById(req, res, next);
  res.status(statusCodes?.ok).send(NoteData);
};
const NoteDelete = async (req, res, next) => {
  const NoteDelData = await noteService.DeleteNote(req, res, next);
  res.status(statusCodes?.ok).send(NoteDelData);
};
const NoteUpdate = async (req, res, next) => {
  const NoteUpdateData = await noteService.UpdateNote(req, res, next);
  res.status(statusCodes?.ok).send(NoteUpdateData);
};

export default {
  NoteAdd,
  NoteFetch,
  NoteById,
  NoteDelete,
  NoteUpdate,
};
