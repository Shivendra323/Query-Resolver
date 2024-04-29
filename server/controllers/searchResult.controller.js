const { Post } = require("../dbSchema/schema");

const results = async (req, res) => {
  try {
    console.log(req.query);
    const {query} = req.query; // Assuming the query parameter is named "query"

    // Perform text search on the "content" field of the Post schema
    const searchResults = await Post.find({ $text: { $search: query } });
    console.log(searchResults);
    return res.status(200).send(searchResults);
  } catch (error) {
    console.error("Error searching for posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { results };
