const Sequelize = require('sequelize')
const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize;
const db = require('../db')

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
});

module.exports = Comment;