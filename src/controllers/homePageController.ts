import express from 'express';

const homePageRouter = express.Router();

homePageRouter.get('/', (req: express.Request, res: express.Response) => {
  console.log('Received call.');
  res.render('index');
});

export { homePageRouter };
