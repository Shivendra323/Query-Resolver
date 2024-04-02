const express = require("express");
const path = require('path');
const loginRoute =  express();

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

//loginRoute.use(express.static(path.join(__dirname, 'view')));

loginRoute.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../view/index.html'));
  });

module.exports = loginRoute;