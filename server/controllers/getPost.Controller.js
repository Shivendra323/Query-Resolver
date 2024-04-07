const { Post } = require('../dbSchema/schema.js')

const fetchPosts = async(req,res)=>{
    try{
        const data = await Post.find({});
        //console.log(data);
        res.status(200).send(data);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    fetchPosts
}