const authenticate = require("../middlewares/authenticate")
const express = require("express") 
const UserController = require("../controllers/Users")
const router = express.Router()

router.route("/").get(UserController.index)
router.route("/:id").get(UserController.findOne)
router.route("/:me").get(UserController.profile)
router.route("/").post(UserController.create)
router.route("/profile/:id").get(authenticate, UserController.profile)
router.route("/login").post(UserController.login)

router.route("/:id/retweet").post(authenticate, UserController.retweet)
router.route("/:me/retweets").get(authenticate, UserController.getretweets)


module.exports = router