const httpStatus = require("http-status");
const {
  passwordToHash,
  generateAccesToken,
  generateRefreshToken,
} = require("../utils/helper");
const UserService = require("../services/Users");
const TweetService = require ("../services/Tweet");
class User {
  profile(req, res){
    UserService
    .findOne({_id: req.user._id})
    .then((response) => {
      console.log("qd")
        res.status(httpStatus.CREATED).send(response)
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Error occurred while creating user" });
      });
  }
  login(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user)
          return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "The user not find" });
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateAccesToken(user),
            refresh_token: generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(
          {
          _id: user._id,
          full_name: user.full_name,
          email: user.email,
          token: user.tokens
        }
        );
      })
      .catch((e) =>
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: "Error occured while login user" })
      );
  }
  profile(req, res){
    UserService
    .findOne({_id: req.user._id})
    .then((response) => {
        res.status(httpStatus.CREATED).send(response)
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
  index(req, res) {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  findOne(req, res) {
    UserService
        .findOne({nick_name: req.params.nickname})
            .then((user) => {
                return res.status(httpStatus.OK).send(
                  {
                    _id: user._id,
                    full_name: user.full_name,
                    nick_name: user.nick_name,
                    email: user.email,
                    tweets: user.tweets,
                    following: user.following,
                    followers: user.followers,
                    retweets: user.retweets
                  }
                )
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
  }
  retweet(req, res) {
      TweetService.create({author: req.user._id, originalTweet:req.params.id, ...req.body})
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
        UserService.update({_id: req.user._id }, {$push: {retweets:req.params.id}}).then()
      })
      .catch((e) => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send(e);
      });
  }
  getretweets(req, res){
  UserService
  .findOne({_id: req.user._id})
  .then((response) => {
      res.status(httpStatus.CREATED).send(response.retweets)
  }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
  getFollowing(req, res ){
  UserService
  .findOne({_id: req.params.id})
  .then((response) => {
      res.status(httpStatus.CREATED).send(response.following)
  }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
  getFollowers(req, res){
  UserService
  .findOne({_id: req.params.id})
  .then((response) => {
    res.status(httpStatus.CREATED).send(response.followers)
  }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
  async followUser(req, res, next) {
    await UserService.update({_id: req.user._id }, {$push: {following:req.params.id}})
    await UserService.update({_id: req.params.id }, {$push: {followers:req.user._id}})
    next()
  }
}
module.exports = new User();
