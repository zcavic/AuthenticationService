import { ImportMock } from 'ts-mock-imports';
import * as authentication from '../controllers/middleware/authentication';
import { User } from '../model/user';
import * as userRepository from '../repository/userRepository';
import { expect } from 'chai';
import { createUser, setNewPassword } from '../services/userService';

describe('User service', () => {
  afterEach(function () {
    ImportMock.restore();
  });

  it('Create a new user', async () => {
    // Mock
    const hashPassword = ImportMock.mockFunction(authentication, 'hashPassword');
    const addUser = ImportMock.mockFunction(userRepository, 'addUser');
    const getUser = ImportMock.mockFunction(userRepository, 'getUser');
    const getUserByEmail = ImportMock.mockFunction(userRepository, 'getUserByEmail');
    const mockUser: User = {
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      password: 'Th!sT3st',
    };
    let savedUser: User = mockUser;
    hashPassword.callsFake(() => {
      return 'hash';
    });
    addUser.callsFake((x: User) => {
      savedUser = x;
      return true;
    });
    getUser.callsFake(() => {
      return false;
    });
    getUserByEmail.callsFake(() => {
      return false;
    });
    // Test
    const isCreated = await createUser(mockUser);
    // Assert
    expect(isCreated).to.equal(true);
    expect(savedUser.password).to.equal('hash');
  });
  it('Set a new password', async () => {
    // Mock
    const comparePassword = ImportMock.mockFunction(authentication, 'comparePassword');
    const hashPassword = ImportMock.mockFunction(authentication, 'hashPassword');
    const getUser = ImportMock.mockFunction(userRepository, 'getUser');
    const updateUser = ImportMock.mockFunction(userRepository, 'updateUser');
    const mockUser: User = {
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      password: 'Th!sT3st',
    };
    comparePassword.callsFake(() => {
      return false;
    });
    hashPassword.callsFake(() => {
      return 'hash';
    });
    getUser.callsFake((username: string) => {
      if (username === mockUser.username) return mockUser;
      else return false;
    });
    updateUser.callsFake((user: User) => {
      if (user.password === 'hash') return true;
      else return false;
    });
    // Test
    const isChanged = await setNewPassword(mockUser.username, mockUser.password);
    // Assert
    expect(isChanged).to.equal(true);
  });
});
