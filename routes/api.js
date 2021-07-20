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
router.get('/user-ratings', ensureAuthenticated, apiController.GetUserRatings);
// ToDo API endpoint to return advice text (Jira ITW-24)

module.exports = router;
