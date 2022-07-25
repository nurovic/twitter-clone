const httpStatus = require("http-status");
const TweetService = require("../services/Tweet");

class Tweet {
  create(req, res) {
    TweetService.create({author: req.user._id, ...req.body})
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Error occurred while creating user" });
      });
  }
  index(req, res) {
    TweetService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  findOne(req, res) {
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message:"ID information is missing for Update"
        })
    }
    TweetService
        .findOne({_id: req.params.id})
            .then((user) => {
                return res.status(httpStatus.OK).send(user)
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
  }
  deleteTweet(req, res) {
    TweetService.deleteMany({ _id: { $in: req.params?.id} })
        .then((deleteTweet) => {
            if (!deleteTweet) { return res.status(httpStatus.NOT_FOUND).send({ message: "This tweet not found" }) }
            res.status(httpStatus.OK).send({ message: "Tweet Deleted" })
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Error occured while delete tweet" }))

  }
  makeComment(req, res) {
    TweetService
        .findOne({ _id: req.params.id })
        .then(tweetTask => {
            const comment = {
                ...req.body,
                commented_at: new Date(),
                user_id: req.user.id
            }
            tweetTask.comments.push(comment)
            tweetTask.save()
                .then((commented) => {
                    return res.status(httpStatus.OK).send(commented)
                })
                .catch(e => res.status(INTERNAL_SERVER_ERROR).send({ error: "Error occured while comment" }))
        })
  }
  deleteComment(req, res) {
    TweetService
        .findOne({ _id: req.params.id })
        .then(tweetTask => {
            if(!tweetTask) return res.status(httpStatus.NOT_FOUND).send({message: "This comment not found"})
            tweetTask.comments = tweetTask.comments.filter((d) => { return d._id.toString() != req.params.commentID })
            tweetTask
                .save()
                .then((update) => {
                    return res.status(httpStatus.OK).send(update)
                })
                .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "comment deleted" }))
        })
}
}
module.exports = new Tweet();
