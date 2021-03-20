const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// ToDo finalize this schema
const adviceEntrySchema = new Schema({
  adviceSlipID: String,
  adviceText: String,
  timesRatedGood: Number,
  timesRatedBad: Number,
});

const AdviceEntry = mongoose.model('adviceEntry', adviceEntrySchema);

module.exports = AdviceEntry;
