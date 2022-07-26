const authenticate = require("../middlewares/authenticate")
const express = require("express") 
const TweetController = require("../controllers/Tweet")
const router = express.Router()
const deleteCheck = require("../utils/deleteCheck")
const deleteCommentCheck = require("../utils/deleteCommentCheck")

router.route("/").get(TweetController.index)
router.route("/:id").get(TweetController.findOne)
router.route("/:id").delete(authenticate, deleteCheck, TweetController.deleteTweet)
router.route("/").post(authenticate, TweetController.create)
router.route("/:id/comment").post(authenticate, TweetController.makeComment)
router.route("/:id/:commentID").delete(authenticate, deleteCommentCheck, TweetController.deleteComment)
router.route("/:id/like").post(authenticate, TweetController.likeTweet)
router.route("/:id/dislike").post(authenticate, TweetController.disLikeTweet)




module.exports = router