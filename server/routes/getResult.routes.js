const express = require("express");

const router = express.Router();

const {results} = require("../controllers/searchResult.controller");

router.get('/', results);

module.exports = router;