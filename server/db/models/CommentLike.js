const Sequelize = require('sequelize');
const { INTEGER, UUID, UUIDV4, BOOLEAN, STRING } = Sequelize;
const db = require('../db');

const CommentLike = db.define('commentLike', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: true,
    primaryKey: true
  },
  thumbsUp: {
    type: BOOLEAN,
    defaultValue: false
  },
  thumbsDown: {
    type: BOOLEAN,
    defaultValue: false
  },
  spotify_id: {
    type: STRING
  },
});

module.exports = CommentLike;