const express = require('express');
const quickAdvice = require('../controllers/quickAdvice');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let context = {
    title: 'Is this wise?',
  };

  res.render('index', context);
});

router.get('/quick-advice', quickAdvice.get_quick_advice);

module.exports = router;
