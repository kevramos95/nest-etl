import { MongoClient } from 'mongodb';

export async function fetchFromMongo(config: {
  mongoUri: string;
  mongoDb: string;
  mongoCollection: string;
  mongoQuery: any[];
}) {
  const client = new MongoClient(config.mongoUri);
  await client.connect();

  const db = client.db(config.mongoDb);

  // Validar si la colección existe
  const collections = await db.listCollections().toArray();
  const exists = collections.some(c => c.name === config.mongoCollection);

  if (!exists) {
    throw new Error(`❌ La colección '${config.mongoCollection}' no existe en la base de datos '${config.mongoDb}'`);
  }

  const collection = db.collection(config.mongoCollection);
  const data = await collection.aggregate(config.mongoQuery).toArray();

  await client.close();
  return data;
}
