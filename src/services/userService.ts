import { comparePassword, hashPassword } from '../controllers/middleware/authentication';
import { User } from '../model/user';
import { addUser, getUser, getUserByEmail, updateUser } from '../repository/userRepository';

async function createUser(user: User) {
  if (await getUser(user.username)) return false;
  if (await getUserByEmail(user.email)) return false;
  user.password = hashPassword(user.password);
  if (await addUser(user)) return true;
  return false;
}

async function setNewPassword(username: string, password: string) {
  const user = await getUser(username);
  if (!user) return false;
  if (comparePassword(password, user.password)) return false;
  user.password = hashPassword(password);
  const acknowledged = await updateUser(user);
  if (!acknowledged) return false;
  return true;
}

export { createUser, setNewPassword };
