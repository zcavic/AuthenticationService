import { User } from '../model/user';
import { collections } from '../repository/databaseContext';

async function getUser(username: string) {
  const user = await collections.user?.findOne({ username: username });
  return user;
}

function isUserCreated(user: User) {
  if (user) return true;
  else return false;
}

async function addUser(user: User) {
  const result = await collections.user?.insertOne(user);
  if (!result) throw new Error(`Failed to add user to the database. User: ${JSON.stringify(user)}`);
  return result.insertedId.toString();
}

async function getAllUsers() {
  const users = await collections.user?.find({}).toArray();
  return users;
}

export { isUserCreated, getUser, addUser, getAllUsers };
