const isAdmin = (req, res, next) => {
    if (!req.user.role !== "admin") {
        next(
            new ErrorHandler(
                `Role : ${req.user.role} is not allowed to access`,
                401
            )
        );
    }
    next();
};

export { isAdmin };
