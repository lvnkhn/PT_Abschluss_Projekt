import { getCollection, serialize, USER_ID } from '$lib/server/db.js';

export async function load() {
  const col = await getCollection('plans');
  const plans = await col
    .find({ userId: USER_ID, status: { $in: ['active', 'completed'] } })
    .sort({ createdAt: -1 })
    .toArray();
  return serialize({ plans });
}
