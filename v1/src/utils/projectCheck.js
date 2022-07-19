const UserService = require("../services/Users");
const CourseService = require("../services/Courses");
const httpStatus = require("http-status");

const check = async (req, res, next) => {
  const course = await CourseService.findOne({ _id: req.params.id })
    .then((course) => {
      return course.members;
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  const check = course.includes(req.user._id.toString());
  console.log(check);
  if (check) {
    next();
  } else {
    await CourseService.findOne({ _id: req.params.id })
      .then((course) => {
        
        return res.status(httpStatus.OK).send(
          {
            course_name: course.course_name,
            price: course.price,
            user_id: course.user_id
          }
        );
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
};
module.exports = check;
