import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/sendToken.js";

// Register a new User
const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone || !role) {
        throw new ErrorHandler("Please, provide all details", 400);
    }

    if (password.length < 8) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long",
            400
        );
    }

    const existedUser = await User.findOne({
        email: email,
    });

    if (existedUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role: role.toLowerCase(),
    });

    res.status(200).json({
        success: true,
        user,
    });
});

const getExaminers = asyncHandler(async (req, res) => {
    const examiners = await User.find({ role: "examiner" });
    res.status(200).json({ success: true, examiners });
});

const getInvigilators = asyncHandler(async (req, res) => {
    const examiners = await User.find({ role: "examiner" });
    res.status(200).json({ success: true, examiners });
});

export { register };
