import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
// import {isLo} from "../"
import { addPaper } from "../controllers/admin.controller.js";

const router = Router();

// router.route("/add/paper").post(isLoggedin, upload.single("paper"), addPaper);

export default router;
