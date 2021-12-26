import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { User } from '../../model/user';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    if (!validator.isLength(username, { min: 2, max: 20 }) || !validator.matches(username, '^[a-zA-Z0-9_.-]*$')) {
      return res.status(400).send({ error: 'invalid username' });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send({
        error:
          'Please create stronger password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1',
      });
    }
    next();
  } catch (e) {
    next(e);
  }
}

function validateSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body as User;
    if (
      !validator.isLength(user.username, { min: 2, max: 20 }) ||
      !validator.matches(user.username, '^[a-zA-Z0-9_.-]*$')
    ) {
      return res.status(400).send({ error: 'invalid username' });
    }
    if (!validator.isStrongPassword(user.password)) {
      return res.status(400).send({ error: 'invalid username' });
    }
    if (!validator.isEmail(user.email)) {
      return res.status(400).send({ error: 'invalid username' });
    }
    if (!validator.isLength(user.firstName, { min: 2, max: 20 })) {
      return res.status(400).send({ error: 'invalid username' });
    }
    if (!validator.isLength(user.lastName, { min: 2, max: 20 })) {
      return res.status(400).send({ error: 'invalid username' });
    }
    next();
  } catch (e) {
    next(e);
  }
}

export { validateLogin, validateSignup };
