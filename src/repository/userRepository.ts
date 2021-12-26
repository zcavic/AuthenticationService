import { ExistingUser, User } from '../model/user';
import { collections } from '../repository/databaseContext';
import { ObjectId } from 'mongodb';

async function getUser(username: string) {
  const user = await collections.user?.findOne({ username: username });
  return user as unknown as ExistingUser;
}

async function getUserByEmail(email: string) {
  const user = await collections.user?.findOne({ email: email });
  return user as unknown as ExistingUser;
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

async function updateUser(user: ExistingUser) {
  const query = { username: user.username };
  const result = await collections.user?.updateOne(query, {
    $set: user as User,
  });
  if (!result) throw new Error('Failed to upload database.');
  return result.acknowledged;
}

export { isUserCreated, getUser, addUser, getAllUsers, getUserByEmail, updateUser };
