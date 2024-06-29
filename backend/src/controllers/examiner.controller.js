import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/cloudinary.js";
import { Paper } from "../models/paper.model.js";

const uploadPaper = asyncHandler(async (req, res) => {
    const localFile = req.file;
    const { year, semester, branch, subject, starttime, endtime } = req.body;
    const author = req.user._id;

    if (!localFile) {
        throw new ErrorHandler("Please, provide file", 400);
    }

    const url = await uploadImage(localFile);

    if (!url) {
        throw new ErrorHandler("Something went wrong", 500);
    }

    const paper = await Paper.create({
        author: req.user._id,
        year,
        semester,
        branch,
        subject,
        url,
        starttime,
        endtime,
    });

    res.status(200).json({
        success: true,
        paper,
    });
});

export { uploadPaper };
