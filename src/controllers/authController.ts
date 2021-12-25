import express from 'express';
import passport from 'passport';
import { User } from '../model/user';
import { createUser } from '../services/userService';

const authRouter = express.Router();

authRouter
  .route('/signup')
  .get((req: express.Request, res: express.Response) => {
    res.render('signup');
  })
  .post(async (req: express.Request, res: express.Response) => {
    const user = req.body as User;
    const successful = await createUser(user);
    if (successful) {
      console.log(`The new user is created. Username: ${user.username}`);
      req.login(req.body, () => {
        res.redirect('/');
      });
    } else {
      console.log(`The user already exist. Username: ${user.username}`);
      res.redirect('/auth/signup');
    }
  });

authRouter
  .route('/login')
  .get((req: express.Request, res: express.Response) => {
    res.render('login');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/confidential',
      failureRedirect: '/auth/login',
    })
  );

export { authRouter };
