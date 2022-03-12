const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Show = db.define("podcast", {
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
    type: STRING,
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
  hrefUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Show;
