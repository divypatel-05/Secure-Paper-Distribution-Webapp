import { Router } from "express";
import {
    login,
    forgotPassword,
    resetPassword,
    logout,
    getUser,
} from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(isLoggedin, logout);

//Get User
router.route("/get").get(getUser);

export default router;
