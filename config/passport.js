import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: 'your-google-client-id',
      clientSecret: 'your-google-client-secret',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName } = profile;
      let user = await User.findOne({ googleId: id });

      if (!user) {
        user = new User({
          name: displayName,
          email: emails[0].value,
          googleId: id,
        });
        await user.save();
      }

      done(null, user);
    }
  )
);
