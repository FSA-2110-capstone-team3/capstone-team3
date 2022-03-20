const Sequelize = require("sequelize");
const { ARRAY, STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Show = db.define("show", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  spotify_id: {
    type: STRING,
    allowNull: false
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING(2000),
    allowNull: false,
  },
  publisher: {
    type: STRING,
    allowNull: false,
  },
  media_type: {
    type: STRING,
    allowNull: false,
  },
  href: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  images: {
    type: ARRAY(TEXT),
    allowNull: false
  },
});

module.exports = Show;
