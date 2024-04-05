const express = require("express");
const router = express.Router();
const {newPost} = require('../controllers/newPost.Controller.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null,'./Image/')
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage});

router.post("/",upload.single('image'), newPost);

module.exports = router;

