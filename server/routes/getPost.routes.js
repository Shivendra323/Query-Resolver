const express = require("express")
const router = express.Router();

const {fetchPosts} = require("../controllers/getPost.Controller.js");

router.get('/getPost',fetchPosts);

module.exports = router;