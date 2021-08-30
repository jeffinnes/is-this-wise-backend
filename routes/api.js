const express = require('express');

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
router.get('/advice-text/:adviceID', apiController.GetAdviceByID);
router.get('/all-ratings', apiController.GetAllRatings);

module.exports = router;
