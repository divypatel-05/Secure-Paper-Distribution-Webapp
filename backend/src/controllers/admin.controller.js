import { ErrorHandler } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addPaper = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
    });
});

export { addPaper };
