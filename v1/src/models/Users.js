const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    password: String,
    email: String,

  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(require("mongoose-autopopulate"));
module.exports = Mongoose.model("user", UserSchema);
