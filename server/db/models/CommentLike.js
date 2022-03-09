const Sequelize = require('sequelize');
const { INTEGER, UUID, UUIDV4 } = Sequelize;
const db = require('../db');

const CommentLike = db.define('commentLike', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  thumbsUp: {
    type: INTEGER,
    allowNull: true
  },
  thumbsDown: {
    type: INTEGER,
    allowNull: true
  }
});

module.exports = CommentLike;