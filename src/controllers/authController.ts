import { Request, Response, NextFunction } from 'express';
import { User } from '../model/user';
import { getUser, getUserByEmail, updateUser } from '../repository/userRepository';
import { sendEmailForPasswordChange } from '../services/emailService';
import { createUser } from '../services/userService';
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
    const user = await getUserByEmail(email);
    if (user) {
      await sendEmailForPasswordChange(email, user.username);
    }
    res.redirect('/');
  } catch (e) {
    next(e);
  }
}

function showChangePasswordPage(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (e) {
    next(e);
  }
  const { token } = req.params;
  res.render('changePassword', {
    token,
  });
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
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
