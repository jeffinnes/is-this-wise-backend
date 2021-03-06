const superagent = require('superagent');

exports.get_quick_advice = (req, res, next) => {
  let context = {
    title: 'Is this wise?',
  };

  superagent.get('https://api.adviceslip.com/advice')
    .then((adviceRes) => {
      const adviceObj = JSON.parse(adviceRes.text);
      context.advice = `${adviceObj.slip.advice}`;
      console.log(context);
      res.render('quickAdvice', context);
    })
    .catch((err) => {
      console.error(err);
    });
}