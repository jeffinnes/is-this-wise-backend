const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect(`${process.env.FRONTEND_URL_ROOT}`);
});

router.get('/github',
  passport.authenticate('github', { scope: ['user:email', 'read:user'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTEND_URL_ROOT}/login` }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL_ROOT}/profile`);
  });

module.exports = router;
