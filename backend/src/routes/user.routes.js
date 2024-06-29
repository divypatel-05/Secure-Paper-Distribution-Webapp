import { Router } from "express";
import { register, login, logout } from "../controllers/user.controller.js";

const router = Router();

//Register
router.route("/register").post(register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

export default router;
