const Sequelize = require('sequelize')
const { ARRAY, INTEGER, STRING, TEXT, UUID, UUIDV4 } = Sequelize;
const db = require('../db');

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
    type: STRING(2000),
    allowNull: false
  },
  duration_ms: {
    type: INTEGER,
    allowNull: false
  },
  href: {
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
  // audio_preview_url: {
  //   type: STRING,
  //   allowNull: false
  // },
  images: {
    type: ARRAY(TEXT),
    allowNull: false
  },
  views: {
    type: INTEGER,
    defaultValue: 0
  }
},
// {     <----deprecated hook - episodeLike now created when user likes/dislikes an episode
//   hooks: {
//     afterCreate: async(episode, options) => {
//       await EpisodeLike.create({episodeId: episode.id})
//     }
//   }
// }
);

module.exports = Episode;