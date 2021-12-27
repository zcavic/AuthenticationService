import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUser } from '../../../repository/userRepository';
import { comparePassword, hashPassword } from '../../middleware/authentication';

function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        (async function validateUser() {
          try {
            const user = await getUser(username);
            if (user && comparePassword(password, user.password)) {
              done(null, user);
            } else {
              done('Wrong email or password', false);
            }
          } catch (error) {
            done(error, false);
          }
        })();
      }
    )
  );
}

export { localStrategy };
