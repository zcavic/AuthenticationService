import { listen } from './app';
import { connectToDatabase } from './repository/databaseContext';

connectToDatabase().then(() => {
  listen();
});
