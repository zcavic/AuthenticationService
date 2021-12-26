import { Express } from 'express';
import { authenticateBasic } from './middleware/authentication';
import { showConfidentialPage } from './confidentialDataController';
import { showHomePage } from './homePageController';
import {
  loginUser,
  sendResetPasswordEmail,
  showChangePasswordPage,
  showLoginPage,
  showResetPasswordPage,
  showSignupPage,
  signupUser,
  updatePassword,
} from './authController';

function initializeRouts(app: Express) {
  app.get('/', showHomePage);

  app.get('/confidential', authenticateBasic, showConfidentialPage);

  app.get('/auth/signup', showSignupPage);
  app.post('/auth/signup', signupUser);

  app.get('/auth/login', showLoginPage);
  app.post('/auth/login', loginUser);

  app.get('/auth/forgotPassword', showResetPasswordPage);
  app.post('/auth/forgotPassword', sendResetPasswordEmail);

  app.get('/auth/changePassword/:token', showChangePasswordPage);
  app.post('/auth/changePassword/:token', updatePassword);
}

export { initializeRouts };
