const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) return next(createError(401, "You are not authenticated!"));
    const token = authHeader.split(" ")[1];

    console.log("token: ", token);
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

module.exports = verifyToken;