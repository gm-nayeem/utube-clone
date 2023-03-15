const jwt = require("jsonwebtoken");
const {createError} = require("../utils/error");

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
    const token = {user: "test"};
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};