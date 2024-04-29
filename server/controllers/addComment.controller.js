const { Comment } = require('../dbSchema/schema.js');

const addComment = async (req, res) => {
    try {
        const { contents, postId } = req.body;
        console.log(req.body);
        // Find the comment with the given post_id
        let comment = await Comment.findOne({ post_id: postId });

        comment = new Comment({
            contents: contents, // Store comment content as string
            post_id: postId
        })

        // Save the comment to the database
        await comment.save();

        res.status(201).json({ message: "Successfully added comment to database", comment: comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addReply = async (req, res) => {
    try {
        const { contents, commentId } = req.body;

        // Find the comment with the given commentId
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Create new reply
        const reply = {
            contents: contents
        };

        // Push the reply to the replies array of the comment
        comment.replies.push(reply);

        // Save the updated comment
        await comment.save();

        res.status(201).json({ message: "Reply added successfully", comment: comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addComment,
    addReply
}
