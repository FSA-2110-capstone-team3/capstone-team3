const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
let request = require("request");
let querystring = require("querystring");
const env = require("../.env");
const axios = require("axios");
const User = require('./db/models/User')

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
        redirect_uri: redirect_uri, //!then redirects to our localhost declared above
      })
  );
});

app.get("/callback", async function (req, res) {
  //!the one thats receiving the redirect back from spotify. Which receives a code and then uses along with a secret to grab the access token. Then takes the access token and sends it off to our front end.
  try {
    console.log('REQ QUERYCODE', req.query.code)
    let code = req.query.code || null;
    // console.log('CODE ---> ', code);
    const token = await User.authenticate(req.query.code);
    console.log('MY TOKEN--->', token);
    res.send(`
      <html>
        <body>
          <script>
            window.localStorage.setItem('token', '${token}');
            window.document.location = '/';
          </script>
        </body>
      </html>
    `);
  }
  catch(ex) {
    console.log(ex);
  }

  // console.log('req', req.query.code);


  // request.post(authOptions, async function (error, response, body) {
  //   const access_token = body.access_token;
  //   let uri = process.env.FRONTEND_URI || "http://localhost:8080/";
  //   //!once we log into spotify and have access to Spotify's data, our backend send you back to the front-end, (aka to the link above) so back to our react app
  //   //!where our react app is hosted in production (once we deploy on heroku, itll be out heroku link)
  //   res.redirect(uri + "?access_token=" + access_token);
  //   // const user = (await axios.get('https://api.spotify.com/v1/me', 
  //   // {
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     Authorization: "Bearer " + access_token,
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // }
  //   // )).data;
  //   // console.log(user);
  // });
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
