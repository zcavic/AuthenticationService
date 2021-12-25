import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { authRouter } from './controllers/authController';
import { passportConfig } from './controllers/config/passport';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // TODO check this middleware 
app.use(cookieParser());
app.use(session({ secret: 'mySecret' })); // TODO check this middleware 
passportConfig(app);

app.use('/auth', authRouter);

function listen(): void {
  app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
  });
}

export { listen };
