const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect(`${process.env.FRONTEND_URL_ROOT}/login`);
});

// To return the user data to the client
router.get('/check', (req, res) => {
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user,
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({
    user: {
      _id: null,
      name: null,
    },
  });
});

router.get('/github',
  passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL_ROOT}/login` }),
  (req, res) => {
    // Successful authentication, redirect to profile.
    res.redirect(`${process.env.FRONTEND_URL_ROOT}/history`);
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL_ROOT}/login` }),
  (req, res) => {
    // Successful authentication, redirect to profile.
    res.redirect(`${process.env.FRONTEND_URL_ROOT}/history`);
  });

module.exports = router;
