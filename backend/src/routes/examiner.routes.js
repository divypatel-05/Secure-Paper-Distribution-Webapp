import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";
import { uploadPaper } from "../controllers/examiner.controller.js";
import { isExaminer } from "../middlewares/isExaminer.js";

const router = Router();

//Upload Paper
router
    .route("/add/paper")
    .post(isLoggedin, isExaminer, upload.single("paper"), uploadPaper);

export default router;
