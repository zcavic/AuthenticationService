import express from 'express';
import { User } from '../model/user';
import { createUser } from '../services/userService';

const authRouter = express.Router();

authRouter.post('/signup', async (req: express.Request, res: express.Response) => {
  // TODO
  // validate input data
  // encrypt password
  const user = req.body as User;
  const successful = await createUser(user);
  if (successful) {
    console.log(`The new user is created. Username: ${user.username}`);
    req.login(req.body, () => {
      res.redirect('/auth/profile');
    });
  } else {
    console.log(`The user already exist. Username: ${user.username}`);
    res.redirect('/');
  }
});

authRouter.get('/profile', (req: express.Request, res: express.Response) => {
  res.json(req.user);
});

export { authRouter };
