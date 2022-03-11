const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require('../db');

const CommentReply = db.define('commentReply', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: true,
    primaryKey: true
  },
  content: {
    type: STRING,
    allowNull: true
  }
});

module.exports = CommentReply;