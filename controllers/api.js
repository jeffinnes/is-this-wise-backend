const User = require('../models/user');
const Advice = require('../models/advice');

async function SubmitRating(req, res) {
  // Record users rating to their history
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

  // Update the raitings Good/Bad totals
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
            adviceText: req.body.adviceText,
            timesRatedGood: 1,
            timesRatedBad: 0,
          })
            .save()
            .then((saveResult) => {
              console.log(saveResult);
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
            adviceText: req.body.adviceText,
            timesRatedGood: 0,
            timesRatedBad: 1,
          })
            .save()
            .then((saveResult) => {
              console.log(saveResult);
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

async function GetUserRatings(req, res) {
  User.findById(req.session.passport.user, 'ratingHistory')
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function GetAllRatings(reg, res) {
  try {
    const result = await Advice.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

// API endpoint to return advice text
async function GetAdviceByID(req, res) {
  try {
    const result = await Advice.findOne({ adviceSlipID: req.params.adviceID });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  SubmitRating,
  GetUserRatings,
  GetAdviceByID,
  GetAllRatings,
};
