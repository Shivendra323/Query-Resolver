const { Post, Comment, Like } = require('../dbSchema/schema.js')

const fetchPosts = async(req,res)=>{
    try{
        // const data = await Post.find({});
        // const sortedData = data.sort((a, b) => b.created_at - a.created_at);
        // const postsWithComments = await Comment.find({}).populate('post_id');
    

        const allPosts = await Post.find({}).lean();

        // Fetch comments for each post and parse them
        const postsWithComments = await Promise.all(allPosts.map(async (post) => {
            const comments = await Comment.find({ post_id: post._id }).lean();
            const like = await Like.find({ post_id: post._id}).lean();
            return { post, comments, like };
        }));

        const jsonString = JSON.stringify(postsWithComments, null, 2);
        // Parse the JSON string back into an array of objects
        const data = JSON.parse(jsonString);

        // Sort the array based on the created_at field of the post
        data.sort((a, b) => new Date(b.post.created_at) - new Date(a.post.created_at));

        // Convert the sorted array back into a JSON string
        const sortedData = JSON.stringify(data, null, 2);

        console.log(sortedData);

        res.status(200).send(sortedData);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    fetchPosts
}