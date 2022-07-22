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
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST).send({
            message:"ID information is missing for Update"
        })
    }
    UserService
        .findOne({_id: req.params.id})
            .then((user) => {
                return res.status(httpStatus.OK).send(
                  {
                    _id: user._id,
                    full_name: user.full_name,
                    profession: user.profession,
                    profile_image: user.profile_image,
                    about: user.about,
                    created_courses: user.created_courses
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
    console.log()
      res.status(httpStatus.CREATED).send(response.retweets)
  }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:e}))
  }
}
module.exports = new User();
