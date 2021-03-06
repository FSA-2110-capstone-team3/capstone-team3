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
  },
  spotify_id: {
    type: STRING
  },
  isReplied: {
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = Comment;