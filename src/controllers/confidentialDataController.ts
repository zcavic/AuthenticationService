import express from 'express';

const confidentialDataRouter = express.Router();

confidentialDataRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
});

confidentialDataRouter.route('/').get((req: express.Request, res: express.Response) => {
  res.render('confidentialData');
});

export { confidentialDataRouter };
