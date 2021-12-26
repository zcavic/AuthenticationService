import { Request, Response, NextFunction } from 'express';

function showHomePage(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('index');
  } catch (e) {
    next(e);
  }
}

export { showHomePage };
