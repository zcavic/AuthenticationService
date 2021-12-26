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
    $set: user as User,
  });
  if (!result) throw new Error('Failed to upload database.');
  return result.acknowledged;
}

export { getUser, addUser, getAllUsers, getUserByEmail, updateUser };
