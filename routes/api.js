const express = require('express');
const passport = require('passport');

const apiController = require('../controllers/api');

const router = express.Router();

// Define auth check function
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    res.json({
      message: 'Authentication check failed.',
    });
  }

  return next();
}

router.post('/submit-rating', ensureAuthenticated, apiController.SubmitRating);

module.exports = router;