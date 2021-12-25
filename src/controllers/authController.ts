import express from 'express';

const authRouter = express.Router();

authRouter.post('/signup', (req: express.Request, res: express.Response) => {
  req.login(req.body, () => {
    res.redirect('/auth/profile');
  });
});

authRouter.get('/profile', (req: express.Request, res: express.Response) => {
  res.json(req.user);
});

export { authRouter };
