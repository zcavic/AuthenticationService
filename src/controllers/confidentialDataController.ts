import { Request, Response } from 'express';

function showConfidentialPage(req: Request, res: Response) {
  res.render('confidentialData');
}

export { showConfidentialPage };
