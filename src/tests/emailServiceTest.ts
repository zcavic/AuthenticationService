import { ImportMock } from 'ts-mock-imports';
import * as authentication from '../controllers/middleware/authentication';
import sgMail from '@sendgrid/mail/';
import * as dotenv from 'dotenv';
import * as userRepository from '../repository/userRepository';
import { User } from '../model/user';
import { sendEmailForPasswordChange } from '../services/emailService';
import { expect } from 'chai';

describe('Email service', () => {
  afterEach(function () {
    ImportMock.restore();
  });

  it('Send email for password reset', async () => {
    // Mock
    ImportMock.mockFunction(dotenv, 'config');
    ImportMock.mockFunction(sgMail, 'setApiKey');
    const send = ImportMock.mockFunction(sgMail, 'send');
    const getUserByEmail = ImportMock.mockFunction(userRepository, 'getUserByEmail');
    const createToken = ImportMock.mockFunction(authentication.jwtToken, 'createToken');
    process.env.SENDGRID_API_KEY = 'API_KEY';
    process.env.DOMAIN_URL = 'DOMAIN_URL';
    const mockUser: User = {
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      password: 'Th!sT3st',
    };
    getUserByEmail.callsFake((email: string) => {
      if (email === mockUser.email) return mockUser;
      else return false;
    });
    createToken.callsFake((username: string) => {
      if (username === mockUser.username) return 'token';
      else return false;
    });
    let toCheck: { to: string; from: string; subject: string; html: string } = {
      to: '',
      from: '',
      subject: '',
      html: '',
    };
    send.callsFake((data: { to: string; from: string; subject: string; html: string }) => {
      toCheck = data;
    });

    // Test
    const isSent = await sendEmailForPasswordChange(mockUser.email);
    // Assert
    expect(isSent).to.equal(true);
    expect(toCheck.to).to.equal(mockUser.email);
    expect(toCheck.from).to.equal('sirius.bent@gmail.com');
    expect(toCheck.subject).to.equal('Best To Do password reset');
    expect(toCheck.html).to.contains('DOMAIN_URL/auth/changePassword/token');
  });
});
