import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { authRouter } from './controllers/authController';
import { passportConfig } from './controllers/config/passport';
import { homePageRouter } from './controllers/homePageController';
import { confidentialDataRouter } from './controllers/confidentialDataController';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // TODO check this middleware
app.use(cookieParser());
app.use(session({ secret: 'mySecret' })); // TODO check this middleware
passportConfig(app);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', homePageRouter);
app.use('/auth', authRouter);
app.use('/confidential', confidentialDataRouter)

function listen(): void {
  app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
  });
}

export { listen };
