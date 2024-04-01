const { User } = require('../dbSchema/schema');

async function registerUser(username, email, role, password, confirmPassword) {
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Create new user
    const newUser = new User({
      username: username,
      email: email,
      role: role,
      password: password
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Return the saved user
    return savedUser;
  } catch (error) {
    // Handle any errors
    console.error('Error registering user:', error);
    throw error;
  }
}

module.exports = { registerUser };