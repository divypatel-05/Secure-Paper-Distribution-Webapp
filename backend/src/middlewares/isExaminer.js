import { ErrorHandler } from "../utils/errorHandler.js";

const isExaminer = (req, res, next) => {
    if (req.user.role.toLowerCase() !== "examiner") {
        next(
            new ErrorHandler(
                `Role : ${req.user.role} is not allowed to access`,
                401
            )
        );
    }
    next();
};

export { isExaminer };
