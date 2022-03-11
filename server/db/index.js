//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Comment = require('./models/Comment');
const CommentLike = require('./models/CommentLike');
const CommentReply = require('./models/CommentReply');
const Episode = require('./models/Episode');
const EpisodeLike = require('./models/EpisodeLike');
const Show = require('./models/Show');
const TimeStamp = require('./models/TimeStamp');

//associations could go here!

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
    TimeStamp
  },
}
