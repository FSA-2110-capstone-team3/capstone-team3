const Sequelize = require('sequelize')
const { TIME, UUID, UUIDV4, STRING, TEXT, INTEGER } = Sequelize;
const db = require('../db')

const TimeStamp = db.define('timeStamp', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: true,
    primaryKey: true
  },
  timeStamp: {
    type: INTEGER
  },
  spotify_id: {
    type: STRING
  },
  description: {
    type: TEXT
  },
  hr: {
    type: STRING
  },
  min: {
    type: STRING
  },
  sec: {
    type: STRING
  }
}); 

module.exports = TimeStamp;