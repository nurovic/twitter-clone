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
        autopopulate: { maxDepth: 2 }

      }
    ],
    followers: [],
    following: []
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = Mongoose.model("user", UserSchema);
