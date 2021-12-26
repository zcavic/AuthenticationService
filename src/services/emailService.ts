import { jwtToken } from '../controllers/middleware/authentication';
import { User } from '../model/user';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
console.log('email service')
console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = (receiver: string, source: string, subject: string, content: string) => {
  const data = {
    to: receiver,
    from: source,
    subject,
    html: content,
  };
  try {
    sgMail.send(data);
  } catch (e) {
    console.log(e);
  }
};

async function sendEmailWithResetLink(email: string, username: string) {
  const token = jwtToken.createToken(username);
  const link = `$http://localhost:5000/auth/resetPassword/${token}`;
  sendEmail(
    email,
    'sirius.bent@gmail.com',
    'Best To Do password reset',
    `
      <div>Click the link below to reset your password</div><br/>
      <div>${link}</div>
      `
  );
  return true;
}

export { sendEmailWithResetLink };
