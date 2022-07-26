const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    nick_name: String,
    password: String,
    email: String,
    profil_picture: String,
    tweets: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
      }
    ],
    retweets: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
      }
    ],
    followers: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: { maxDepth: 2, select: "full_name  profile_picture nick_name" }
      }
    ],
    following: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: { maxDepth: 2, select: "full_name  profile_picture nick_name" }
      }
    ],
    likedTweets: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = Mongoose.model("user", UserSchema);
