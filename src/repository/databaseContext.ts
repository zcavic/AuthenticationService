import * as mongoDB from 'mongodb';

const collections: { user?: mongoDB.Collection } = {};

async function connectToDatabase(): Promise<void> {
  const client = await mongoDB.MongoClient.connect(process.env.DB_CONN_STRING as string);
  const db = client.db(process.env.DB_NAME as string);
  const userCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME as string);
  collections.user = userCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`
  );
}

export { collections, connectToDatabase };
