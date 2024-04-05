const express = require("express");
const router = express.Router();
const {newPost} = require('../controllers/newPost.Controller.js');
const multer = require('multer');


const upload = multer({dest:'./Image/'});

module.exports = router;

router.post("/",upload.single('image'), newPost);