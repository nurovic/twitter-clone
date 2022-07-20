const authenticate = require("../middlewares/authenticate")
const express = require("express") 
const TweetController = require("../controllers/Tweet")
const router = express.Router()

router.route("/").get(TweetController.index)
router.route("/:id").get(TweetController.findOne)
router.route("/").post(authenticate, TweetController.create)




module.exports = router