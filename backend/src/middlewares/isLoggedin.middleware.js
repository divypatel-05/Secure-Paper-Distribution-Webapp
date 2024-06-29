import { ErrorHandler } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new ErrorHandler("You are not logged in", 401);
        }

        const _id = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(_id);

        if (!user) {
            throw new ErrorHandler("You are not logged in", 401);
        }

        req.user = user;

        next();
    } catch (error) {
        next(new ErrorHandler("You are not Logged in", 404));
    }
};
