const express = require("express");

const router = express.Router();

const { addReply } = require("../controllers/addComment.controller");

router.post("/", addReply);

module.exports = router