const Sequelize = require('sequelize')
const { STRING, ARRAY, TEXT, UUID, UUIDV4, JSON } = Sequelize;
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv');
const env = require("../../../.env");
let request = require("request");
const axios = require("axios");
const qs = require('qs');
const res = require('express/lib/response');
process.env.SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
process.env.SPOTIFY_CLIENT_SECRET = env.SPOTIFY_SECRET_KEY;

const SALT_ROUNDS = 5;

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userData: {
    type: JSON
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  // password: {
  //   type: STRING,
  // },
  display_name: {
    type: STRING,
    defaultValue: null,
  },
  imagesArr: {
    type: ARRAY(TEXT),
    defaultValue: null,
  },
  country: {
    type: STRING,
    defaultValue: null,
  },
  access_token: {
    type: STRING,
    defaultValue: 'hello',
    allowNull: false
  }
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
let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8080/callback"
let access_token;
let spotifyUser;
User.authenticate = async function(code){
  try {
    // axios({
    //   method: 'post',
    //   url: 'https://accounts.spotify.com/api/token',
    //   data: qs.stringify({
    //     grant_type: 'authorization_code',
    //     code: code,
    //     redirect_uri: redirect_uri
    //   }),
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     Authorization: `Basic ${new Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    //   },
    // })
    //   .then(response => {
    //     if (response.status === 200) {
    //       console.log('AUTHENTICATE RESPONSE.DATA', response.data);
    //       const { access_token, token_type } = response.data;

    //       axios.get('https://api.spotify.com/v1/me', {
    //         headers: {
    //           Authorization: `${token_type} ${access_token}`
    //         }
    //       })
    //         .then(response => {
    //           let findUser = User.findOne({where: { email: response.data.email }});
    //           if (!findUser) {
    //             findUser = User.create({
    //               email: response.data.email,
    //               access_token: access_token
    //               // userData: spotifyUser
    //             })
    //           }
    //           return jwt.sign({ id: findUser.id }, process.env.JWT);
    //           // console.log(response.data)
    //         })
    //         .catch(error => {
    //           res.send(error);
    //         });
    //       // const spotifyUser = (await axios.get('https://api.spotify.com/v1/me', 
    //       //     {
    //       //       headers: {
    //       //         Accept: "application/json",
    //       //         Authorization: "Bearer " + access_token,
    //       //         "Content-Type": "application/json",
    //       //       },
    //       //     })).data;
    //       // console.log('SPOTIFY USER--->', spotifyUser);

    //       // let findUser = await User.findOne({where: { email: spotifyUser.email }});
    //       // if (!findUser) {
    //       //   findUser = await User.create({
    //       //     email: spotifyUser.email,
    //       //     access_token: access_token
    //       //     // userData: spotifyUser
    //       //   })
    //       // }
    //         // if (!user || !(await user.correctPassword(password))) {
    //         //   const error = Error('Incorrect email/password');
    //         //   error.status = 401;
    //         //   throw error;
    //         // }
    //         // return jwt.sign({ id: findUser.id }, process.env.JWT);
    //       // res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
    //     } 
    //     // else {
    //     //   console.log('AUTHENTICATE RESPONSE', response)
    //     // }
    //   })
    //   .catch(error => {
    //     res.send(error);
    //   });
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };
    // const data = {
    //   grant_type: "authorization_code",
    //   code: code,
    //   redirect_uri: redirect_uri
    // }

    // const headers = {
    //   Authorization: `Basic ${new Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // }

    // const response = (await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)).data;
    // console.log('RESPONSE', response);

    request.post(authOptions, async function (error, response, body) {
      access_token = body.access_token;
      // let uri = process.env.FRONTEND_URI || "http://localhost:8080/";
      console.log('ACCESS TOKEN--->', access_token)
    });

    const spotifyUser = (await axios.get('https://api.spotify.com/v1/me', 
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      })).data;
    console.log('SPOTIFY USER--->', spotifyUser);

    let findUser = await User.findOne({where: { email: spotifyUser.email }});
    if (!findUser) {
      findUser = await User.create({
        email: spotifyUser.email,
        access_token: access_token
        // userData: spotifyUser
      })
    }
    // if (!user || !(await user.correctPassword(password))) {
    //   const error = Error('Incorrect email/password');
    //   error.status = 401;
    //   throw error;
    // }
    return jwt.sign({ id: findUser.id }, process.env.JWT);
    // return findUser.generateToken()
  }
  catch(ex) {
    // return 'hellooooooooo'
    console.log('nooo', ex);
  }
};

User.findByToken = async function(token) {
  try {
    console.log('findByToken TOKEN', token);
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    // if (!user) {
    //   throw 'nooo'
    // }
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
