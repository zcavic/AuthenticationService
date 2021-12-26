import { passportLogin } from './config/passport';
import { Express } from 'express';
import { showConfidentialPage } from './confidentialDataController';
import { authenticate } from './middleware/authentication';
import { showHomePage } from './homePageController';
import { validateLogin, validateSignup } from './middleware/validations';
import {
  sendResetPasswordEmail,
  showChangePasswordPage,
  showLoginPage,
  showResetPasswordPage,
  showSignupPage,
  signupUser,
  updatePassword,
} from './authController';

function routesConfig(app: Express) {
  app.route('/').get(showHomePage);
  app.route('/confidential').get(authenticate, showConfidentialPage);
  app.route('/auth/signup').get(showSignupPage).post(validateSignup, signupUser);
  app.route('/auth/login').get(showLoginPage).post(validateLogin, passportLogin);
  app.route('/auth/forgotPassword').get(showResetPasswordPage).post(sendResetPasswordEmail);
  app.route('/auth/changePassword/:token').get(showChangePasswordPage).post(updatePassword);
  app.route('/auth/changePassword/:token').get(showChangePasswordPage).post(updatePassword);
}

export { routesConfig };
