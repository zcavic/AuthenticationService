import { User } from '../model/user';
import { collections } from '../repository/databaseContext';

async function getUser(username: string) {
  const user = await collections.user?.findOne({ username: username });
  return user as unknown as User;
}

async function getUserByEmail(email: string) {
  const user = await collections.user?.findOne({ email: email });
  return user as unknown as User;
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

async function updateUser(user: User) {
  const query = { username: user.username };
  const result = await collections.user?.updateOne(query, {
    $set: user,
  });
  if (!result) throw new Error('Failed to upload database.');
  return result.acknowledged;
}

export { isUserCreated, getUser, addUser, getAllUsers, getUserByEmail, updateUser };
