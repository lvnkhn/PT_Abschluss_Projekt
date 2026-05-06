import { getCollection, serialize, USER_ID } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const [plansCol, exercisesCol, categoriesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('exercises'),
    getCollection('categories'),
  ]);

  let plan;
  try {
    plan = await plansCol.findOne({ _id: new ObjectId(params.id), userId: USER_ID });
  } catch {
    throw error(404, 'Plan not found');
  }
  if (!plan) throw error(404, 'Plan not found');

  const [exercises, categories] = await Promise.all([
    exercisesCol.find().toArray(),
    categoriesCol.find().toArray(),
  ]);

  return serialize({ plan, exercises, categories });
}

export const actions = {
  rename: async ({ request, params }) => {
    const data = await request.formData();
    const name = data.get('name')?.trim();
    if (!name) return { error: 'Name erforderlich' };
    const col = await getCollection('plans');
    await col.updateOne({ _id: new ObjectId(params.id) }, { $set: { name } });
    return { success: true };
  },

  removeExercise: async ({ request, params }) => {
    const data = await request.formData();
    const exerciseId = data.get('exerciseId');
    const col = await getCollection('plans');
    await col.updateOne(
      { _id: new ObjectId(params.id) },
      { $pull: { exercises: { exerciseId } } }
    );
  },

  addExercise: async ({ request, params }) => {
    const data = await request.formData();
    const exerciseId = data.get('exerciseId');
    const [plansCol, exercisesCol] = await Promise.all([
      getCollection('plans'),
      getCollection('exercises'),
    ]);
    const [plan, exercise] = await Promise.all([
      plansCol.findOne({ _id: new ObjectId(params.id) }),
      exercisesCol.findOne({ _id: new ObjectId(exerciseId) }),
    ]);
    if (!plan || !exercise) return;
    if (plan.exercises.some(e => e.exerciseId === exerciseId)) return;
    await plansCol.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: {
          exercises: {
            exerciseId,
            name: exercise.name,
            categoryId: exercise.categoryId,
            imageUrl: exercise.imageUrl || '',
            done: false,
          }
        }
      }
    );
    return { success: true };
  },
};
