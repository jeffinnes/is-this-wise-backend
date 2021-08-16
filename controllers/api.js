const User = require('../models/user');
const Advice = require('../models/advice');
const logger = require('../configs/winston-config');

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
            .then(() => {
              logger.info(`Saved rating for --> ${req.body.adviceID}`);
            })
            .catch((error) => {
              logger.error(error);
            });
        }
      })
      .catch((error) => {
        logger.error(error);
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
            .then(() => {
              logger.info(`Saved rating for --> ${req.body.adviceID}`);
            })
            .catch((error) => {
              logger.error(error);
            });
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  res.status(204).send();
}

async function GetUserRatings(req, res) {
  User.findById(req.session.passport.user, 'ratingHistory')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      logger.error(error);
    });
}

async function GetAllRatings(reg, res) {
  try {
    const result = await Advice.find();
    res.json(result);
  } catch (error) {
    logger.error(error);
  }
}

// API endpoint to return advice text
async function GetAdviceByID(req, res) {
  try {
    const result = await Advice.findOne({ adviceSlipID: req.params.adviceID });
    res.json(result);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  SubmitRating,
  GetUserRatings,
  GetAdviceByID,
  GetAllRatings,
};
