const express = require('express'); // Express app
const router = express.Router();    // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const authenticateJWT = require('./jsonwebtoken'); // Import the authenticateJWT function

// define route for registration endpoint
router
  .route('/register')
  .post(authController.register);

// define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)    // GET Method routes tripsList
  .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

// define route for login endpoint
router
  .route('/login')
  .post(authController.login);

module.exports = router;
