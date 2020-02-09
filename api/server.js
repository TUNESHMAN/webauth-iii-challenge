const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const apiRouter = require("./api-router");
const configuredMiddleware = require("./configure-middleware");

const server = express();
// COOKIE CONFIGURATION TAKES PLACE HERE
server.use(
  session({
    name: "fly",
    secret: "To be kept safe!", //This is used to encrypt and decrypt the cookie
    cookie: {
      maxAge: 1000 * 600,
      secure: false, //true in production
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("../database/dbConfig.js"), // configured instance of knex
      tablename: "sessions", // table that will store sessions inside the db, name it anything you want
      sidfieldname: "sid", // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60 // time it takes to check for old sessions and remove them from the database to keep it clean and performant
    })
  })
);
configuredMiddleware(server);
server.use("/api", apiRouter);
module.exports = server;
