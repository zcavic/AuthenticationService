import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../model/user';
import { getUser, getUserByEmail, updateUser } from '../repository/userRepository';
import { sendEmailWithResetLink } from '../services/emailService';
import { createUser } from '../services/userService';
import { jwtToken } from './middleware/authentication';

function showSignupPage(req: Request, res: Response) {
  res.render('signup');
}

async function signupUser(req: Request, res: Response) {
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
}

function showLoginPage(req: Request, res: Response) {
  res.render('login');
}

async function loginUser() {
  passport.authenticate('local', {
    successRedirect: '/confidential',
    failureRedirect: '/auth/login',
  });
}

function showResetPasswordPage(req: Request, res: Response) {
  res.render('forgotPassword');
}

async function sendResetPasswordEmail(req: Request, res: Response) {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    await sendEmailWithResetLink(email, user.username);
  }
  res.redirect('/');
}

function showChangePasswordPage(req: Request, res: Response) {
  const { token } = req.params;
  res.render('changePassword', {
    token,
  });
}

async function updatePassword(req: Request, res: Response) {
  const { password } = req.body;
  const { token } = req.params;
  const decoded = jwtToken.verifyToken(token);
  const user = await getUser(decoded as string);
  user.password = password;
  await updateUser(user);
  res.redirect('/auth/login');
}

export {
  showSignupPage,
  signupUser,
  showLoginPage,
  loginUser,
  showResetPasswordPage,
  sendResetPasswordEmail,
  showChangePasswordPage,
  updatePassword,
};
