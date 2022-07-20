const authenticate = require("../middlewares/authenticate")
const express = require("express") 
const UserController = require("../controllers/Users")
const router = express.Router()

router.route("/").get(UserController.index)
router.route("/:id").get(UserController.findOne)
router.route("/:me").get(UserController.profile)
router.route("/").post(UserController.create)
router.route("/:course/buy-course").post(authenticate, UserController.checkout)

router.route("/profile/:id").get(authenticate, UserController.profile)

router.route("/login").post(UserController.login)


module.exports = router