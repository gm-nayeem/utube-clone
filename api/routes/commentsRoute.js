const router = require("express").Router();
const {
    addComment, deleteComment, getComments
} = require("../controllers/commentsController");
const {verifyToken} = require("../middleware/verifyToken");

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

module.exports = router;
