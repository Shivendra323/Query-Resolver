const { Post } = require('../dbSchema/schema.js')

const fetchPosts = async(req,res)=>{
    try{
        const data = await Post.find({});
        const sortedData = data.sort((a, b) => b.created_at - a.created_at);
        //console.log(data);
        res.status(200).send(sortedData);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    fetchPosts
}