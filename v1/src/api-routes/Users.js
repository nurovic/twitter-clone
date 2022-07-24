const authenticate = require("../middlewares/authenticate")
const express = require("express") 
const UserController = require("../controllers/Users")
const mailCheck = require('../utils/mailCheck')
const router = express.Router()

router.route("/").get(UserController.index)
router.route("/:nickname").get(UserController.findOne)
router.route("/:me").get(UserController.profile)
router.route("/").post(mailCheck, UserController.create)
router.route("/profile/:id").get(authenticate, UserController.profile)
router.route("/login").post(UserController.login)

router.route("/:id/retweet").post(authenticate, UserController.retweet)
router.route("/:me/retweets").get(authenticate, UserController.getretweets)
router.route("/:id/following").get(UserController.getFollowing)
router.route("/:id/followers").get( UserController.getFollowers)

router.route("/:id/follow").post(authenticate, UserController.followUser)

module.exports = router