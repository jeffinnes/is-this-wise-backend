const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let context = {
    title: 'Is this wise?',
  };

  res.render('index', context);
});

module.exports = router;
