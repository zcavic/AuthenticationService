import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../model/user';
import { Request, Response, NextFunction } from 'express';
import { getUser } from '../../repository/userRepository';

const hashPassword = (password: string) => bcrypt.hashSync(password, 10);
const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);

const jwtToken = {
  createToken(username: string) {
    return jwt.sign(username, process.env.JWT_SECRET as string);
  },
  verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  },
};

function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error });
    }
    const user = decoded as User;
    return getUser(user.username).then((existingUser) => {
      if (!existingUser) {
        return res.status(401).send({ error: 'User does not exist' });
      }
      return next();
    });
  });
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

export { jwtToken, hashPassword, comparePassword, authenticate };
