import { getCollection, serialize, USER_ID } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function load() {
  const col = await getCollection('plans');
  const [draft, savedPlans] = await Promise.all([
    col.findOne({ userId: USER_ID, status: 'draft' }),
    col
      .find({ userId: USER_ID, status: { $in: ['active', 'completed'] } })
      .sort({ createdAt: -1 })
      .toArray(),
  ]);
  const plan = draft ?? await col.findOne({ userId: USER_ID, status: 'active' }, { sort: { createdAt: -1 } });
  return serialize({ plan, savedPlans });
}

export const actions = {
  saveName: async ({ request }) => {
    const data = await request.formData();
    const planId = data.get('planId');
    const name = data.get('name')?.trim();
    if (!name) return { error: 'Name erforderlich' };
    const col = await getCollection('plans');
    await col.updateOne(
      { _id: new ObjectId(planId) },
      { $set: { name, status: 'active' } }
    );
    return { success: true };
  },

  toggleDone: async ({ request }) => {
    const data = await request.formData();
    const planId = data.get('planId');
    const exerciseId = data.get('exerciseId');
    const currentDone = data.get('done') === 'true';
    const col = await getCollection('plans');

    await col.updateOne(
      { _id: new ObjectId(planId), 'exercises.exerciseId': exerciseId },
      { $set: { 'exercises.$.done': !currentDone } }
    );

    const plan = await col.findOne({ _id: new ObjectId(planId) });
    if (plan.exercises.length > 0 && plan.exercises.every(e => e.done)) {
      await col.updateOne(
        { _id: new ObjectId(planId) },
        { $set: { status: 'completed', lastCompletedAt: new Date() } }
      );
    }
  },

  removeExercise: async ({ request }) => {
    const data = await request.formData();
    const planId = data.get('planId');
    const exerciseId = data.get('exerciseId');
    const col = await getCollection('plans');
    await col.updateOne(
      { _id: new ObjectId(planId) },
      { $pull: { exercises: { exerciseId } } }
    );
  }
};
