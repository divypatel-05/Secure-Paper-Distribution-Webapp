import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/uploadPdf.js";
import { Paper } from "../models/paper.model.js";

const uploadPaper = asyncHandler(async (req, res) => {
    const localFile = req.file;
    const { year, semester, branch, subject } = req.body;

    if (!localFile) {
        throw new ErrorHandler("Please, provide file", 400);
    }

    const url = await uploadImage(localFile.path);

    if (!url) {
        throw new ErrorHandler("Something went wrong", 500);
    }

    const paper = await Paper.create({
        author: req.user._id,
        year,
        semester,
        branch,
        subjectcode: subject,
        url,
    });

    res.status(200).json({
        success: true,
        paper,
    });
});

const deletePaper = asyncHandler(async (req, res) => {
    let paper = await Paper.findById(req.params._id);
    if (!paper) {
        throw new ErrorHandler("Paper not found", 404);
    }
    await Paper.findByIdAndDelete(req.params._id);
    res.status(200).json({
        success: true,
        message: "Paper deleted successfully",
    });
});

const getPapers = asyncHandler(async (req, res) => {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        papers,
    });
});

export { uploadPaper, deletePaper, getPapers };
