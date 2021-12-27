import { Request, Response, NextFunction } from 'express';
import { User } from '../model/user';
import { sendEmailForPasswordChange } from '../services/emailService';
import { createUser, setNewPassword } from '../services/userService';
import { jwtToken } from './middleware/authentication';

function showSignupPage(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('signup');
  } catch (e) {
    next(e);
  }
}

async function signupUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body as User;
    if (await createUser(user)) {
      console.log(`The new user is created. Username: ${user.username}`);
      req.login(req.body, () => {
        res.redirect('/');
      });
    } else {
      res.status(400).send({ error: `The user or email already registered. ${user.username} ${user.email}` });
    }
  } catch (e) {
    next(e);
  }
}

function showLoginPage(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('login');
  } catch (e) {
    next(e);
  }
}

function showResetPasswordPage(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('forgotPassword');
  } catch (e) {
    next(e);
  }
}

async function sendResetPasswordEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    if (await sendEmailForPasswordChange(email)) res.redirect('/');
    else res.status(400).send({ error: 'Not registered email.' });
  } catch (e) {
    next(e);
  }
}

function showChangePasswordPage(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.params;
    res.render('changePassword', {
      token,
    });
  } catch (e) {
    next(e);
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const username = jwtToken.verifyToken(token);
    if (await setNewPassword(username as string, password)) res.redirect('/auth/login');
    else return res.status(400).send({ error: 'Password is same.' });
  } catch (e) {
    next(e);
  }
}

export {
  showSignupPage,
  signupUser,
  showLoginPage,
  showResetPasswordPage,
  sendResetPasswordEmail,
  showChangePasswordPage,
  updatePassword,
};
