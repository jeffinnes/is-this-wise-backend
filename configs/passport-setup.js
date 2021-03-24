const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

/** General Passport configs */
/** Passport takes that user id and stores it internally on
 * req.session.passport which is passport’s internal
 * mechanism to keep track of things. */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/** Makes a request to our DB to find the full profile information
 * for the user and then calls done(null, user). This is where
 * the user profile is attached to the request handler at req.user. */
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    /** This takes the profile info and attaches it on the request
     * object so its available on your callback url as req.user. */
    done(null, user);
  });
});

/** GitHub Passport configs */
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Callback method triggered upon signing in.
    User.findOne({ githubId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          githubId: profile.id,
          username: profile.username,
          name: profile.displayName,
        })
          .save()
          .then((newUser) => {
            done(null, newUser);
          });
      }
    });
  },
));
