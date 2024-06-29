import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/sendToken.js";

// Register a new User
const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, enrollment, phone, gender } = req.body;

    if (!name || !email || !password || !enrollment || !phone || !gender) {
        throw new ErrorHandler("Please, provide all details", 400);
    }

    if (password.length < 8) {
        throw new ErrorHandler(
            "Password must be at least 8 characters long",
            400
        );
    }

    const existedUser = await User.findOne({
        $or: [{ email: email }, { enrollment: enrollment }],
    });

    if (existedUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    const user = await User.create({
        name,
        email,
        password,
        enrollment,
        phone,
        gender: gender.toLowerCase(),
    });

    sendToken(user, 201, res);
});

// Login user
const login = asyncHandler(async (req, res) => {
    const { enrollment, password } = req.body;

    if (!enrollment || !password) {
        throw new ErrorHandler("Enrollment no. & Password is required", 400);
    }

    const user = await User.findOne({ enrollment }).select("+password");

    if (!user) {
        throw new ErrorHandler("Invalid Enrollment no. or Password", 401);
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

export { register, login, resetPassword, logout, forgotPassword };
