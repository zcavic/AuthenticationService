import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUser } from '../../../repository/userRepository';

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

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
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
