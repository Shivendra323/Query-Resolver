const express = require("express")
const router = express.Router();

const {addComment} = require('../controllers/addComment.controller.js');

router.post('/addComment',addComment)

module.exports = router