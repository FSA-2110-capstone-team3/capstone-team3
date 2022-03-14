const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
let request = require("request");
let querystring = require("querystring");
const env = require("../.env");

process.env.SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
process.env.SPOTIFY_CLIENT_SECRET = env.SPOTIFY_SECRET_KEY;
//process.env.REDIRECT_URI = env.REDIRECT_URI;

// console.log(process.env.SPOTIFY_CLIENT_ID);
// console.log(process.env.SPOTIFY_CLIENT_SECRET);
// console.log(process.env.REDIRECT_URI);

module.exports = app;

//----------- TRYING OAUTH
//Used https://github.com/mpj/oauth-bridge-template spotify OAUTH template and filled it in with our localhost

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8080/callback"; //!We need to tell dev spotify sit that this callback URI is valid for security purposes. Needs to be the same URI as the one on dev spotify

app.get("/login", function (req, res) {
  //! serves /login
  res.redirect(
    //! immediatelyy re-directs
    "https://accounts.spotify.com/authorize?" + //! with all these querystrings
      querystring.stringify({
        //! not sure why its decprecated, still works tho
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri, //!then redirects to our localhost declared above
      })
  );
});

app.get("/callback", function (req, res) {
  //!the one thats receiving the redirect back from spotify. Which receives a code and then uses along with a secret to grab the access token. Then takes the access token and sends it off to our front end.
  let code = req.query.code || null;
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
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    console.log(body);
    let uri = process.env.FRONTEND_URI || "http://localhost:8080/";
    //!once we log into spotify and have access to Spotify's data, our backend send you back to the front-end, (aka to the link above) so back to our react app
    //!where our react app is hosted in production (once we deploy on heroku, itll be out heroku link)
    res.redirect(uri + "?access_token=" + access_token);
  });
});

let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  form: {
    grant_type: "client_credentials",
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

app.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    // var token = body.access_token;
    const token = 'BQBuCk3RJJfIWqANaZo7sndITQLflAv2LR5NyNuKnAegs34XI1aecTUNSKz3jTSuXkTUXOcRIiUycWaAFQn4qRaRgilO_UXLyGbKk4jT30BOVF4FIUOZMo-5jPG7Thghpp_d7Byzt3BTtLRntcv_NtQuAHpr-nY4fyQ'
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    app.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

//------------------------------------------------------------

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
