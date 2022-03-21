const Sequelize = require('sequelize')
const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize;
const db = require('../db');
const CommentLike = require('./CommentLike');

const Comment = db.define('comment', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: STRING,
    allowNull: true
  },
  edited: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
},
{
  hooks: {
    afterCreate: async(comment, options) => {
      await CommentLike.create({ commentId: comment.id })
    }
  }
});

module.exports = Comment;