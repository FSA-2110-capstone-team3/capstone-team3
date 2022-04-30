//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Comment = require("./models/Comment");
const CommentLike = require("./models/CommentLike");
const CommentReply = require("./models/CommentReply");
const Episode = require("./models/Episode");
const EpisodeLike = require("./models/EpisodeLike");
const Show = require("./models/Show");
const TimeStamp = require("./models/TimeStamp");

User.hasMany(Comment); //<-- User associations
Comment.belongsTo(User);

User.hasMany(Show);
Show.belongsTo(User);

User.hasMany(Episode);
Episode.belongsTo(User);

User.hasMany(EpisodeLike);
EpisodeLike.belongsTo(User);

Show.hasMany(Episode); //<-- Show associations
Episode.belongsTo(Show);

Episode.hasMany(Comment); //<-- Episode associations
Comment.belongsTo(Episode);

Episode.hasMany(EpisodeLike);
EpisodeLike.belongsTo(Episode);

Episode.hasMany(TimeStamp);
TimeStamp.belongsTo(Episode);

Comment.hasMany(CommentLike); //<-- Comment associations
CommentLike.belongsTo(Comment);

User.hasMany(CommentLike); //<-- Comment associations
CommentLike.belongsTo(User);

Comment.belongsTo(Comment, { as: "reply" });
Comment.hasMany(Comment, { foreignKey: "replyId", as: "replies" });

module.exports = {
  db,
  models: {
    User,
    Comment,
    CommentLike,
    CommentReply,
    Episode,
    EpisodeLike,
    Show,
    TimeStamp,
  },
};
