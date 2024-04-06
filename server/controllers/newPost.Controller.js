// Post image to DB
const {User, Post} = require('../dbSchema/schema.js');

const newPost =  async(req, res) => {
    // Access form data here
    const user = await User.findOne({ username: req.body.username });
    const id = user._id;
    const savePost = new Post({
      content:req.body.userInput,
      image:req.file.path,
      user_id: id,
    });

    const data = await savePost.save();
    res.send("Success");
    return data;
  };

  module.exports = {
    newPost
  }