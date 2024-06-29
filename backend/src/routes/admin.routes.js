import { Router } from "express";
import { register } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

//Register
router.route("/register").post(isLoggedin, isAdmin, register);

export default router;
