import { Router } from "express";
import {
    login,
    forgotPassword,
    resetPassword,
    logout,
} from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(isLoggedin, logout);

export default router;
