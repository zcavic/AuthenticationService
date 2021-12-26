/*
import { Express } from 'express';
import { showConfidentialPage } from './confidentialDataController';
import { showHomePage } from './homePageController';
import { authenticate } from './middleware/authentication';

const routes = (app: Express) => {
  app.get('/', showHomePage);

  app.get('/confidential', authenticate, showConfidentialPage);

  app.get('/auth/signup', signupUser);
  app.get('/auth/login', showConfidentialPage);
  app.post('/auth/login', showConfidentialPage);
};

export { routes };
*/
