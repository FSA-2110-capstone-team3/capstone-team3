const Sequelize = require('sequelize')
const { INTEGER, STRING, ARRAY, TEXT, UUID, UUIDV4 } = Sequelize;
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  // id: {
  //   type: UUID,
  //   defaultValue: UUIDV4,
  //   allowNull: false,
  //   primaryKey: true
  // },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
  // display_name: {
  //   type: STRING,
  //   allowNull: true
  // },
  // email: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmail: true
  //   }
  // },
  // imagesArr: {
  //   type: ARRAY(TEXT)

  // },
  // country: {
  //   type: STRING,
  //   allowNull: true
  // }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
