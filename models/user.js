const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  email: String,
  githubId: String,
  googleId: String,
  facebookId: String,
  ratingHistory: [
    {
      adviceSlipID: String,
      rating: String,
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
