// Post image to DB
const {User, Post} = require('../dbSchema/schema.js');
const uploadOnCloudinary = require('../utils/cloudinary.js');

const newPost =  async(req, res) => {
    // Access form data here
    // console.log(req.body);
    // console.log(req.file);
    const user = await User.findOne({ username: req.body.username });
    const id = user.username;
    let savePost = null;
    if(!req.file){
      savePost = new Post({
        content:req.body.userInput,
        image:null,
        username: id,
      })
    }
    else{
      const response = await uploadOnCloudinary(req.file.path);
      savePost = new Post({
        content:req.body.userInput,
        image:response.url,
        username: id,
      });
    }
    const data = await savePost.save();
    res.send("Success");
    return data;
  };

  module.exports = {
    newPost
  }