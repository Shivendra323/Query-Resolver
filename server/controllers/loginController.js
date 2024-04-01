const { User } = require('../dbSchema/schema');

async function validateUser(username, password) {
  try {
    // Find user by username
    const user = await User.findOne({ username: username });

    // If user not found, return null
    if (!user) {
      return null;
    }

    // Validate password
    const isValidPassword = await User.findOne({ password: password});

    // If password is invalid, return null
    if (!isValidPassword) {
      return null;
    }

    // If username and password are valid, return the user
    return user;
  } catch (error) {
    // Handle any errors
    console.error('Error validating user:', error);
    throw error;
  }
}

module.exports = { validateUser };