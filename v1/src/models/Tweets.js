const Mongoose = require("mongoose");

const TweetSchema = new Mongoose.Schema(
  {
    author:
    {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: { maxDepth: 2, select: "full_name" }
    },
    tweet: String,
    likes:[
        {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'user',
          autopopulate: { select: 'nick_name' },
        },
      ],
    comments: [
        {
            comment: String,
            commened_at: Date,
            user_id: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'user',
                autopopulate: { maxDepth: 2, select: "full_name  profile_picture" }
            },
        }
    ],
    originalTweet: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
        autopopulate: { maxDepth: 2 },
      },
    retweets: [
        {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'tweet',
        },
      ],
  },
  { timestamps: true, versionKey: false }
);

TweetSchema.plugin(require("mongoose-autopopulate"));
module.exports = Mongoose.model("tweet", TweetSchema);
