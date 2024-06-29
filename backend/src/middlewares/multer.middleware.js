import multer from "multer";
import path from "path";
import { ErrorHandler } from "../utils/errorHandler.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${req.user._id}${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["application/pdf"];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedMimeTypes.includes(file.mimetype) && extension === ".pdf") {
        cb(null, true);
    } else {
        cb(new ErrorHandler("Only PDF files are allowed", 400), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
});
