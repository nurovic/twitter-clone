const httpStatus = require("http-status");
const TweetService = require("../services/Tweet");

class Tweet {
  create(req, res) {
      // console.log(req.user)
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
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => res.status(INTERNAL_SERVER_ERROR).send(e));
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
                return res.status(httpStatus.OK).send(user)
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}







}
module.exports = new Tweet();
