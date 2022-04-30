const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
let request = require("request");
let querystring = require("querystring");
const qs = require("qs");
require("dotenv").config();
const axios = require("axios");
const User = require("./db/models/User");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET_KEY,
});

module.exports = {
  app,
  spotifyApi,
};

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8080/callback";
app.get("/login", function (req, res) {
  //! serves /login
  res.redirect(
    //! immediatelyy re-directs
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope:
          "user-read-private user-read-email user-library-read user-library-modify",
        redirect_uri: redirect_uri,
      })
  );
});

app.get("/callback", async function (req, res) {
  try {
    let code = req.query.code || null;
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${new Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_KEY}`
        ).toString("base64")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const ACCESS_TOKEN = response.data.access_token;
          const { access_token, refresh_token, token_type } = response.data;
          axios
            .get("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: `${token_type} ${access_token}`,
              },
            })
            .then(async (response) => {
              console.log(access_token);
              console.log("SPTOIFY USER DATA?", response.data);
              const userInfo = {
                email: response.data.email,
                access_token: access_token,
                refresh_token: refresh_token,
                display_name: response.data.display_name,
              };
              const token = await User.authenticate(userInfo);

              console.log("TOKEN FROM AXIOS", token);
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
            })
            .catch((error) => {
              res.send(error);
            });
        } else {
          res.send(response);
        }
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (ex) {
    console.log(ex);
  }
});

//Refresh user Access Token using the spotify-web-api library & update User db model
app.get("/refreshtoken/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    spotifyApi.setRefreshToken(user.refresh_token);
    spotifyApi.refreshAccessToken().then(function (data) {
      console.log("Access token has been refreshed!");
      user.update({ access_token: data.body["access_token"] });
    });
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

// Retrieve a non-user access token using the spotify-web-api library
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

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
