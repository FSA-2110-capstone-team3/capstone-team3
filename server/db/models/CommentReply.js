const Sequelize = require('sequelize');
const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize;
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
  },
  edited: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = CommentReply;