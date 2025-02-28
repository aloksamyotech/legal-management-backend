import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { getAiReportData } from "../controllers/chatbot.js";

const chatRouter = Router();
chatRouter.post("/ask-ai", asyncHandler(getAiReportData));
export default chatRouter;
