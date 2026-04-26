import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
let db;

async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db('plancrafter');
  }
  return db;
}

export async function getCollection(name) {
  const database = await getDb();
  return database.collection(name);
}
