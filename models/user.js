const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
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
