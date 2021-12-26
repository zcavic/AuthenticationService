import { Request, Response, NextFunction } from 'express';

function showConfidentialPage(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('confidentialData');
  } catch (e) {
    next(e);
  }
}

export { showConfidentialPage };
