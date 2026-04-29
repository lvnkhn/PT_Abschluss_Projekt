import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
let db;

async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db('PT_Project_PlanCrafter');
  }
  return db;
}

export async function getCollection(name) {
  const database = await getDb();
  return database.collection(name);
}

// Konvertiert ObjectId und Date zu JSON-sicheren Werten
export function serialize(doc) {
  if (doc === null || doc === undefined) return doc;
  return JSON.parse(JSON.stringify(doc));
}

export const USER_ID = 'demo';
