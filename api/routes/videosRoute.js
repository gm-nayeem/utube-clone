const router =  require("express").Router();
const { 
    addVideo, addView, getByTag, getVideo, random, 
    search, sub, trend, updateVideo, deleteVideo 
} = require("../controllers/videosController");
const verifyToken = require("../middleware/verifyToken");


//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

module.exports = router;