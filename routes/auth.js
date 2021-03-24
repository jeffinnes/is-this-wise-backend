const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect(`${process.env.FRONTEND_URL_ROOT}/login`);
});

// To return the user data to the client
router.get('/check', (req, res) => {
  console.log(`user - ${req.user}`);
  console.log(req.session.passport);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user,
    });
  }
});

router.get('/github',
  passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL_ROOT}/login` }),
  (req, res) => {
    // Successful authentication, redirect to profile.
    res.redirect(`${process.env.FRONTEND_URL_ROOT}/rate-advice`);
  });

module.exports = router;
