import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { getCollection } from './db.js';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  try {
    const [salt, hash] = stored.split(':');
    const hashBuffer = Buffer.from(hash, 'hex');
    const supplied = scryptSync(password, salt, 64);
    return timingSafeEqual(hashBuffer, supplied);
  } catch {
    return false;
  }
}

export async function createSession(username) {
  const col = await getCollection('sessions');
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await col.insertOne({ token, username, createdAt: new Date(), expiresAt });
  return token;
}

export async function getSession(token) {
  if (!token) return null;
  const col = await getCollection('sessions');
  return col.findOne({ token, expiresAt: { $gt: new Date() } });
}

export async function deleteSession(token) {
  const col = await getCollection('sessions');
  await col.deleteOne({ token });
}
