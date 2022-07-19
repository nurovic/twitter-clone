const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    nick_name: String,
    password: String,
    email: String,
    profil_picture: String,
    tweets: [],
    replies: [],
    followers: [],
    following: [],
    likes: []
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = Mongoose.model("user", UserSchema);
