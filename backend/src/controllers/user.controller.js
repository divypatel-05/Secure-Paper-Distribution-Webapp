import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

// Login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorHandler("Email & Password is required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ErrorHandler("Invalid Email or Password", 401);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ErrorHandler("Invalid Password", 401);
    }

    sendToken(user, 200, res);
});

//Logout User
const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out!!",
    });
});

//Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ErrorHandler("Invalid Email", 404);
    }

    const resetToken = await user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}:${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\nPlease click on the following link to reset your password:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Email",
            message,
        });

        res.status(200).json({
            success: true,
            message: "Email Sent successfully !!",
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        throw new ErrorHandler(err.message, 500);
    }
});

//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ErrorHandler("Invalid Token", 400);
    }

    if (req.body.password !== req.body.confirmPassword) {
        throw new ErrorHandler("Passwords do not match", 400);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get user
const getUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ErrorHandler("You are not logged in", 200);
    }

    const _id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user) {
        throw new ErrorHandler("Token Expired", 200);
    }
    res.status(200).json({
        success: true,
        user,
    });
});

export { login, forgotPassword, resetPassword, logout, getUser };
