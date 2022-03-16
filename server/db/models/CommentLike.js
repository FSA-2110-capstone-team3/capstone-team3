const Sequelize = require('sequelize');
const { INTEGER, UUID, UUIDV4 } = Sequelize;
const db = require('../db');

const CommentLike = db.define('commentLike', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: true,
    primaryKey: true
  },
  thumbsUp: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  thumbsDown: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});

module.exports = CommentLike;