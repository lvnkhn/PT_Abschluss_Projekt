import { getCollection, serialize } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const col = await getCollection('plans');
  const plans = await col
    .find({ userId: locals.userId, status: { $in: ['active', 'completed'] } })
    .sort({ createdAt: -1 })
    .toArray();
  return serialize({ plans });
}

export const actions = {
  activate: async ({ request, locals }) => {
    const data = await request.formData();
    const planId = data.get('planId');
    const col = await getCollection('plans');
    const plan = await col.findOne({ _id: new ObjectId(planId), userId: locals.userId });
    if (!plan) return;
    const update = plan.status === 'completed'
      ? { $set: { status: 'active', lastActivatedAt: new Date(), 'exercises.$[].done': false } }
      : { $set: { lastActivatedAt: new Date() } };
    await col.updateOne({ _id: new ObjectId(planId) }, update);
    redirect(303, '/plan');
  },
};
