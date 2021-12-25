import { User } from '../model/user';

function getUser(username: string) {
  const user: User = {
    email: 'ze@er.com',
    firstName: 'ze',
    lastName: 'ca',
    username: username,
    password: 'pa',
  };
  return user;
}

function isUserCreated(user: User) {
  if (user) return true;
  else return false;
}

export { isUserCreated, getUser };
