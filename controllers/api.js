const User = require('../models/user');
const Advice = require('../models/advice');

async function SubmitRating(req, res) {
  console.log('in SubmitRating');
  console.log(`user - ${req.user}`);
  console.log(req.session.passport);
  console.log(req.body);

  const updateResults = await User.updateOne(
    { _id: req.session.passport.user },
    {
      $push: {
        ratingHistory: {
          adviceSlipID: req.body.adviceID,
          rating: req.body.submittedRating,
        },
      },
    },
  );

  console.log(updateResults);

  res.status(204).send();
}

module.exports = {
  SubmitRating,
};
