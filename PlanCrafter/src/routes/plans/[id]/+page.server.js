import { getCollection, serialize, USER_ID } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const col = await getCollection('plans');
  let plan;
  try {
    plan = await col.findOne({ _id: new ObjectId(params.id), userId: USER_ID });
  } catch {
    throw error(404, 'Plan not found');
  }
  if (!plan) throw error(404, 'Plan not found');
  return serialize({ plan });
}

export const actions = {
  restart: async ({ params }) => {
    const col = await getCollection('plans');
    await col.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status: 'active', lastActivatedAt: new Date(), 'exercises.$[].done': false } }
    );
    redirect(303, `/plans/${params.id}`);
  },

  toggleDone: async ({ request, params }) => {
    const data = await request.formData();
    const exerciseId = data.get('exerciseId');
    const currentDone = data.get('done') === 'true';
    const col = await getCollection('plans');
    const id = new ObjectId(params.id);

    await col.updateOne(
      { _id: id, 'exercises.exerciseId': exerciseId },
      { $set: { 'exercises.$.done': !currentDone } }
    );

    const plan = await col.findOne({ _id: id });
    if (plan.exercises.length > 0 && plan.exercises.every(e => e.done)) {
      await col.updateOne(
        { _id: id },
        { $set: { status: 'completed', lastCompletedAt: new Date() } }
      );
    }
  },
};
