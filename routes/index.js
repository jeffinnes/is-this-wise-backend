const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  /* let context = {
    title: 'Is this wise?',
  };

  res.render('index', context); */
  res.redirect(process.env.FRONTEND_URL_ROOT);
});

module.exports = router;
