const UserService = require("../services/Users");

const mailCheck = (req, res, next) => {
  UserService.findOne({ email: req.body.email }).then((response) => {
    if (response === null) {
      next();
    } else {
      res.send("This email has account.");
    }
  });
};

module.exports = mailCheck;
