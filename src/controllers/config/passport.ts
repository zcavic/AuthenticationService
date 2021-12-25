import passport from 'passport';
import { Express } from 'express';
import { localStrategy } from './strategies/localStrategy';

localStrategy();

function passportConfig(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
}

export { passportConfig };
