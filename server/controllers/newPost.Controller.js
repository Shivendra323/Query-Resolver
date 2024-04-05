// Post image to DB


const newPost =  (req, res) => {
    // Access form data here
    const formData = req.file;
    console.log(formData);
    // Process the FormData as needed
    
    res.send('Form data received successfully.');
  };

  module.exports = {
    newPost
  }