const TweetService = require("../services/Tweet");
const httpStatus = require("http-status");

const deleteCheck = async (req, res, next) => {
  const tweetUser = await TweetService.findOne({ _id: req.params.id })
    .then((user) => {
      if (req.user._id.toString() === user.author._id.toString()) {
        next();
      } 
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: "You Cannot Delete This Tweet."}));

};

module.exports = deleteCheck;
