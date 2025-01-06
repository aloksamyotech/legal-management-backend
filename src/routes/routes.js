import userRouter from "./user.js";
import clientRouter from "./Client.js";
import adviseRouter from "./Advise.js";
import caseRouter from "./Case.js";
import hearingRouter from "./Hearing.js";
import contactRouter from "./Contact.js";
import evidenceRouter from "./Evidence.js";
import expenseRouter from "./Expense.js";
import noteRouter from "./Note.js";
import documentRouter from "./Document.js";
import advocateRouter from "./Advocate.js";
import judgeRouter from "./Judge.js";
import matterRouter from "./Matter.js";
import courtRouter from "./Court.js";
import practiceRouter from "./practiceArea.js";
import policestationRouter from "./PoliceStation.js";
import tagRouter from "./Tag.js";
import caseStageRouter from "./CaseStage.js";
import expenseTypeRouter from "./ExpenseType.js";
import { Router } from "express";
const router = Router();

router.use("/user", userRouter);
router.use("/judge", judgeRouter);
router.use("/client", clientRouter);
router.use("/advocate", advocateRouter);
router.use("/advise", adviseRouter);
router.use("/case", caseRouter);
router.use("/hearing", hearingRouter);
router.use("/contact", contactRouter);
router.use("/evidence", evidenceRouter);
router.use("/expense", expenseRouter);
router.use("/note", noteRouter);
router.use("/matter", matterRouter);
router.use("/document", documentRouter);
router.use("/court", courtRouter);
router.use("/practicearea", practiceRouter);
router.use("/policestation", policestationRouter);
router.use("/tag", tagRouter);
router.use("/casestage", caseStageRouter);
router.use("/expensetype", expenseTypeRouter);
export default router;
