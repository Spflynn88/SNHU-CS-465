const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
  try {
    // Validate that all required fields are present
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ "message": "All fields required" });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ "message": "Email is already registered" });
    }

    // Create a new user instance
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: '' // Start with empty password
    });

    // Set user password using a method that hashes it
    user.setPassword(req.body.password);

    // Save the user to the database
    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(500).json({ "message": "Error saving user" });
    }

    // Generate a JWT token for the user
    const token = user.generateJWT();

    // Respond with the token
    return res.status(200).json({ token });
  } catch (err) {
    // Handle any other errors
    return res.status(500).json({ "message": "An error occurred", error: err.message });
  }
};

const login = (req, res) => {
  // Validate message to ensure that email and password are present.
  if (!req.body.email || !req.body.password) {
      return res
          .status(400)
          .json({ "message": "All fields required" });
  }
  
  // Delegate authentication to passport module
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          // Error in Authentication Process
          return res
              .status(404)
              .json(err);
      }
      
      if (user) { // Auth succeeded - generate JWT and return to caller
          const token = user.generateJWT();
          res
              .status(200)
              .json({ token });
      } else { // Auth failed, return error
          res
              .status(401)
              .json(info);
      }
  })(req, res);
};

// Export methods that drive endpoints.
module.exports = {
  register,
  login
  };
