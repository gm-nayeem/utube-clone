require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// routes
const userRoutes = require("./routes/usersRoute");
const videoRoutes = require("./routes/videosRoute");
const commentRoutes = require("./routes/commentsRoute");
const authRoutes = require("./routes/authRoute");


const app = express();

// mongoose connect
const connect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            throw err;
        });
};

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// server listen port
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connect();
    console.log("Connected to Server");
});