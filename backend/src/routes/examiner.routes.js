import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";
import {
  deletePaper,
  uploadPaper,
  getPapers,
} from "../controllers/examiner.controller.js";
import { isExaminer } from "../middlewares/isExaminer.js";

const router = Router();

//Upload Paper or get Papers
router
  .route("/paper")
  .post(isLoggedin, isExaminer, upload.single("paper"), uploadPaper)
  .get(isLoggedin, getPapers);

//Delete paper
router.route("/paper/:_id").delete(isLoggedin, isExaminer, deletePaper);

export default router;
