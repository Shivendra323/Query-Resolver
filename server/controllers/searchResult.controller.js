const { Post } = require("../dbSchema/schema");

const results = async (req, res) => {
  try {
    console.log(req.query.query);
    const searchText = req.query.query; // Assuming the query parameter is named "query"

    // Perform text search on the "content" field of the Post schema
    const searchResults = await Post.find({ $text: { $search: searchText } });
    console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching for posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { results };
