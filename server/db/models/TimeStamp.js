const Sequelize = require('sequelize')
const { TIME, UUID, UUIDV4 } = Sequelize;
const db = require('../db')

const TimeStamp = db.define('timeStamp', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: true,
    primaryKey: true
  },
  timeStamp: {
    type: TIME
  }
});

module.exports = TimeStamp;