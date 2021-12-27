import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { User } from '../../model/user';

function validateEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'invalid email address.' });
    }
    next();
  } catch (e) {
    next(e);
  }
}

function validatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send({
        error: 'Invalid password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1.',
      });
    }
    next();
  } catch (e) {
    next(e);
  }
}

function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { password, username } = req.body;
    if (!validator.isLength(username, { min: 2, max: 20 }) || !validator.matches(username, '^[a-zA-Z0-9_.-]*$')) {
      return res.status(400).send({ error: 'Invalid username. min: 2, max: 20 ' });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send({
        error: 'Invalid password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1.',
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
    if (!validator.isStrongPassword(user.password)) {
      return res.status(400).send({
        error: 'Invalid password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1.',
      });
    }
    if (!validator.isEmail(user.email)) {
      return res.status(400).send({ error: 'invalid email address.' });
    }
    if (
      !validator.isLength(user.username, { min: 2, max: 20 }) ||
      !validator.matches(user.username, '^[a-zA-Z0-9_.-]*$')
    ) {
      return res.status(400).send({ error: 'Invalid username. min: 2, max: 20 ' });
    }
    if (
      !validator.isLength(user.firstName, { min: 2, max: 20 }) ||
      !validator.matches(user.firstName, '^[a-zA-Z0-9_.-]*$')
    ) {
      return res.status(400).send({ error: 'Invalid name.' });
    }
    if (
      !validator.isLength(user.lastName, { min: 2, max: 20 }) ||
      !validator.matches(user.lastName, '^[a-zA-Z0-9_.-]*$')
    ) {
      return res.status(400).send({ error: 'Invalid name.' });
    }
    next();
  } catch (e) {
    next(e);
  }
}

export { validateLogin, validateSignup, validateEmail, validatePassword };
