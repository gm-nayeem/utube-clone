const User = require("../models/User");
const { createError } = require("../utils/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user create
const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
};

// user login
const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SEC,
            {expiresIn: '7h'}
        );
        const { password, ...others } = user._doc;

        res.status(200).json({...others, token});
    } catch (err) {
        next(err);
    }
};

// google auth
const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.status(200).json({token});
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.status(200).json({...savedUser._doc, token});
        }
    } catch (err) {
        next(err);
    }
};


module.exports = {
    signup,
    signin,
    googleAuth
}