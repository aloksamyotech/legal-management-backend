import * as practiceareaService from "../services/practicearea.js";
import { statusCodes } from "../core/common/constant.js";
const PracticeareaAdd = async (req, res, next) => {
  const PracticeareaData = await practiceareaService.AddPractice(
    req,
    res,
    next,
  );
  res.status(statusCodes?.created).send(PracticeareaData);
};
const PracticeareaFetch = async (req, res, next) => {
  const PracticeareaData = await practiceareaService.GetPractice(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PracticeareaData);
};
const GetAllpracticearea = async (req, res, next) => {
  const PracticeareaData = await practiceareaService.GetAllPractices(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PracticeareaData);
};
const PracticeareaDelete = async (req, res, next) => {
  const PracticeareaDelData = await practiceareaService.DeletePractice(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PracticeareaDelData);
};
const PracticeareaUpdate = async (req, res, next) => {
  const PracticeareaUpdateData = await practiceareaService.UpdatePractice(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PracticeareaUpdateData);
};

export default {
  PracticeareaAdd,
  PracticeareaFetch,
  PracticeareaDelete,
  PracticeareaUpdate,
  GetAllpracticearea,
};
