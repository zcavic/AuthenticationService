import { Request, Response } from 'express';

function showHomePage(req: Request, res: Response) {
  res.render('index');
}

export { showHomePage };
