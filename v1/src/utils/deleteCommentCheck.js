const TweetService = require("../services/Tweet");
const httpStatus = require("http-status");

const deleteCommentCheck = async (req, res, next) => {
  const a = await TweetService.findOne({ _id: req.params.id })
    .then((user) => {
      return user.comments.find(
        (comment) => comment._id == req.params.commentID
      );
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "You Cannot Delete This Tweet." })
    );
  if (a.user_id._id.toString() === req.user._id.toString()) {
    next();
  } else {
    res.send("You Cannot Delete This Tweet.");
  }
};

module.exports = deleteCommentCheck;
