const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
let request = require("request");
let querystring = require("querystring");
const qs = require("qs");
//const env = require(".././.env");
const axios = require("axios");
const User = require("./db/models/User");
const SpotifyWebApi = require("spotify-web-api-node");

require("dotenv").config();

//process.env.SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
//process.env.SPOTIFY_CLIENT_SECRET = env.SPOTIFY_SECRET_KEY;
//process.env.REDIRECT_URI = env.REDIRECT_URI;

// Create the api library object with the credentials
//Spotify 'client-credential-flow' === 'https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/'
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

module.exports = {
  app,
  spotifyApi,
};
// console.log(process.env.SPOTIFY_CLIENT_ID);
// console.log(process.env.SPOTIFY_CLIENT_SECRET);
// console.log(process.env.REDIRECT_URI);

//----------- TRYING OAUTH
//Used https://github.com/mpj/oauth-bridge-template spotify OAUTH template and filled it in with our localhost

let redirect_uri =
  process.env.REDIRECT_URI || "https://podify-fsa.herokuapp.com/callback"; //!We need to tell dev spotify sit that this callback URI is valid for security purposes. Needs to be the same URI as the one on dev spotify

app.get("/login", function (req, res) {
  //! serves /login
  res.redirect(
    //! immediatelyy re-directs
    "https://accounts.spotify.com/authorize?" + //! with all these querystrings
      querystring.stringify({
        //! not sure why its decprecated, still works tho
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope:
          "user-read-private user-read-email user-library-read user-library-modify",
        redirect_uri: redirect_uri, //!then redirects to our localhost declared above
      })
  );
});

app.get("/callback", async function (req, res) {
  //!the one thats receiving the redirect back from spotify. Which receives a code and then uses along with a secret to grab the access token. Then takes the access token and sends it off to our front end.
  try {
    // console.log('REQ QUERYCODE', req.query.code)
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
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const ACCESS_TOKEN = response.data.access_token;
          const { access_token, refresh_token, token_type } = response.data;
          // access_token = response.data.access_token
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
    // console.log('EMAIL', email)
    // console.log('ACCESS TOKEN FROM AXIOS POST', ACCESS_TOKEN)

    // const response = (await axios.post())

    // request.post(authOptions, function (error, response, body) {
    //   access_token = body.access_token;
    //   // let uri = process.env.FRONTEND_URI || "http://localhost:8080/";
    //   console.log('ACCESS TOKEN--->', access_token)
    // });

    // const token = await User.authenticate(userInfo);
    // console.log('MY TOKEN--->', token);
    // res.send(`
    //   <html>
    //     <body>
    //       <script>
    //         window.localStorage.setItem('token', '${token}');
    //         window.document.location = '/';
    //       </script>
    //     </body>
    //   </html>
    // `);
  } catch (ex) {
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
