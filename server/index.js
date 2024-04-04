// server.js

// Importing required modules
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const cors = require('cors'); // Import the cors middleware


// Creating an Express application
const app = express();


// Allow requests from the frontend server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'QueryResolver',
  };
  
  // Middleware setup
  app.use(bodyParser.json()); // Add this line to parse JSON data
  app.use(session({
    secret: 'your-secret-key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: true
  }));
  
///sha224
function cryptoSha(password) {  
    //creating hash object 
    var hash = crypto.createHash('sha224');
    //passing the data to be hashed
    data = hash.update(password);
    //Creating the hash in the required format
    gen_hash= data.digest('hex');
    //Printing the output on the console
    console.log("hash : " + gen_hash);
    return gen_hash;
  }
  
  //Login System
  //const loginRoute = require('./routes/login.js');
  const { validateUser } = require('./controllers/loginController.js');
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    var pw = cryptoSha(password);
    console.log("Login clicked with username: " + email + " and password: " + pw);
    
    try {
      // Validate username and password
      const user = await validateUser(email, pw);
  
      if (user) {
        // Set session variables
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.json({ message: 'Login successful', session: req.session })
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  });
  
  
  //const signupRoute = require('./routes/signup.js');
  const { registerUser } = require('./controllers/signupController.js');
  
  
  app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
      var pw = cryptoSha(password);
      var cpw = cryptoSha(confirmPassword);
  
    console.log("Signup clicked with username: " + username + ", email: " + email + ", and password: "+ pw + "  confirm-password: "+  cpw);
  
  
    try {
      // Create new user
      const newUser = await registerUser(username, email, pw, cpw);
      res.json({ message: 'Sign up successful' });
      // Redirect to signup success page
      //res.sendFile(__dirname + '/view/index.html');
    } catch (error) {
      if (error.message === 'Passwords do not match') {
        res.status(400).send('Passwords do not match');
      } else {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error');
      }
    }
  });
  
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
//  connect database
//const schema = require('./dbSchema/schema.js'); // Import the User model from schema.js
const connectionUri = "mongodb+srv://shivendra2023is21:9aMoXROZMwO9DbDy@cluster0.osrfztt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connectionUri, connectionOptions)
.then(() => {
  console.log("Database Connected");
})
.catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
