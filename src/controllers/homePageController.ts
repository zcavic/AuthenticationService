import express from 'express';

const homePageRouter = express.Router();

homePageRouter.get('/', (req: express.Request, res: express.Response) => {
  res.render('index');
});

export { homePageRouter };
