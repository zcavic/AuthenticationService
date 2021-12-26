import express from 'express';
import passport from 'passport';
import { User } from '../model/user';
import { getUser, getUserByEmail, updateUser } from '../repository/userRepository';
import { sendEmailForPasswordChange } from '../services/emailService';
import { createUser } from '../services/userService';
import { jwtToken } from './middleware/authentication';

const authRouter = express.Router();

authRouter
  .route('/signup')
  .get((req: express.Request, res: express.Response) => {
    res.render('signup');
  })
  .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
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
    } catch (e) {
      next(e);
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

authRouter
  .route('/forgotPassword')
  .get((req: express.Request, res: express.Response) => {
    res.render('forgotPassword');
  })
  .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      if (user) {
        await sendEmailForPasswordChange(email, user.username);
      }
      res.redirect('/');
    } catch (e) {
      next(e);
    }
  });

authRouter
  .route('/changePassword/:token')
  .get((req: express.Request, res: express.Response) => {
    const { token } = req.params;
    res.render('changePassword', {
      token,
    });
  })
  .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const decoded = jwtToken.verifyToken(token);
      const user = await getUser(decoded as string);
      user.password = password;
      await updateUser(user);
      res.redirect('/auth/login');
    } catch (e) {
      next(e);
    }
  });

export { authRouter };
