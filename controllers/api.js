const User = require('../models/user');
const Advice = require('../models/advice');

async function SubmitRating(req, res) {
  // ToDo A user might have already rated this advice. Better check for it before pushing
  await User.updateOne(
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

  if (req.body.submittedRating === 'good') {
    // Save the good rating or create a new advice document with first rating
    await Advice.findOneAndUpdate(
      { adviceSlipID: req.body.adviceID },
      { $inc: { timesRatedGood: 1 } },
    )
      .then((result) => {
        if (!result) {
          new Advice({
            adviceSlipID: req.body.adviceID,
            timesRatedGood: 1,
            timesRatedBad: 0,
          })
            .save()
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Save the bad rating or create a new advice document with first rating
    await Advice.findOneAndUpdate(
      { adviceSlipID: req.body.adviceID },
      { $inc: { timesRatedBad: 1 } },
    )
      .then((result) => {
        if (!result) {
          new Advice({
            adviceSlipID: req.body.adviceID,
            timesRatedGood: 0,
            timesRatedBad: 1,
          })
            .save()
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  res.status(204).send();
}

module.exports = {
  SubmitRating,
};
