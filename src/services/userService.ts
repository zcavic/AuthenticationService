import { User } from '../model/user';
import { addUser, getUser } from '../repository/userRepository';

async function createUser(user: User) {
  const existingUser = await getUser(user.username);
  if (existingUser) return false;
  await addUser(user);
  return true;
}

export { createUser };
