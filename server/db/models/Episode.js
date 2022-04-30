const Sequelize = require("sequelize");
const { ARRAY, INTEGER, STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Episode = db.define("episode", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  spotify_id: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  duration_ms: {
    type: INTEGER,
    allowNull: false,
  },
  href: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  release_date: {
    type: STRING,
    allowNull: false,
  },
  showSpotify_id: {
    type: STRING,
    allowNull: false,
  },
  images: {
    type: ARRAY(TEXT),
    allowNull: false,
  },
  views: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Episode;
