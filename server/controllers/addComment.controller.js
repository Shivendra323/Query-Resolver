const {Comment} = require('../dbSchema/schema.js');
const addComment = async(req,res)=>{ 
    try {
        console.log(req.body);
        //Finding if user comment already exist or not
        const commentData = await Comment.findOne({ post_id : req.body.postId});
        let data = null;
        //If does not exist then adding comment
        if(!commentData){
            let arr = [];
            arr.push(req.body.userId+' : '+ req.body.contents );
            const saveComment = new Comment({
                content:arr,
                post_id:req.body.postId
            })
            data = await saveComment.save();
            //console.log(data);
        }
        //if exist then udating comment field
        else{
            let arr = commentData.content;
            arr.push(req.body.userId+' : '+ req.body.contents );
            //Updating comment field of already existing
            data = await Comment.updateOne({_id:commentData._id}, {
                $set:{
                    content: arr
                }
            })
        }
        res.send("Successfully added comment to database");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    addComment
}