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
  const paper = await Paper.findById(req.params._id);
  if (!paper) {
    throw new ErrorHandler("Paper not found", 404);
  }
  await paper.remove();
  res.status(200).json({
    success: true,
    message: "Paper deleted successfully",
  });
});

const getPapers = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 2;
  const papers = await Paper.find({ author: req.user._id })
    .limit(10)
    .skip(page * (limit - 1))
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    papers,
  });
});

export { uploadPaper, deletePaper, getPapers };
