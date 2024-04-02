const express = require("express");
const path = require('path');
const signupRoute =  express();

//const session = require("express-sessiion");

//const bodyParser = require("body-parser");

//signupRoute.use(express.static(path.join(__dirname, 'view')));

signupRoute.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../view/index.html'));
  });

module.exports = signupRoute;