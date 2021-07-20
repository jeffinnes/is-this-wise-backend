const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Dear Future Jeff, Past and Current Jeff have decided
 * not to save the actual text of the adviceSlip and just retrieve the text
 * on the front end when needed. This may or may not have been a good decision.
 */

const adviceEntrySchema = new Schema({
  adviceSlipID: String,
  adviceText: String,
  timesRatedGood: Number,
  timesRatedBad: Number,
});

const AdviceEntry = mongoose.model('adviceEntry', adviceEntrySchema);

module.exports = AdviceEntry;
