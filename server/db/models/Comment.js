const Sequelize = require('sequelize')
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require('../db')

const Comment = db.define('comment', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: STRING
  }
});

module.exports = Comment;