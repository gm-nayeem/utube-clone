const router = require("express").Router();
const { 
    signin, signup, googleAuth
} = require("../controllers/authController");


//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//GOOGLE AUTH
router.post("/google", googleAuth)

module.exports = router;