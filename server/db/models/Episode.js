const Sequelize = require('sequelize')
const { ARRAY, INTEGER, STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const db = require('../db')

const Episode = db.define('episode', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  spotify_id: {
    type: STRING,
    allowNull: false
  },
  name: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  },
  duration_ms: {
    type: INTEGER,
    allowNull: false
  },
  hrefUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  release_date: {
    type: STRING,
    allowNull: false
  },
  imagesArr: {
    type: ARRAY(TEXT),
    allowNull: false
  }
});

module.exports = Episode;