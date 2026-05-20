import { getCollection, serialize } from '$lib/server/db.js';
import { addExerciseToDraft, addExerciseToPlan } from '$lib/server/planHelper.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  const userId = locals.userId;
  const [exercisesCol, categoriesCol, plansCol] = await Promise.all([
    getCollection('exercises'),
    getCollection('categories'),
    getCollection('plans'),
  ]);

  let exercise;
  try {
    exercise = await exercisesCol.findOne({ _id: new ObjectId(params.id) });
  } catch {
    throw error(404, 'Exercise not found');
  }

  if (!exercise) throw error(404, 'Exercise not found');

  const [category, plans] = await Promise.all([
    categoriesCol.findOne({ slug: exercise.categoryId }),
    plansCol.find({ userId, status: 'active' }).sort({ lastActivatedAt: -1 }).limit(5).toArray(),
  ]);

  return serialize({ exercise, category, plans });
}

export const actions = {
  addToPlan: async ({ request, locals }) => {
    const data = await request.formData();
    const exerciseId = data.get('exerciseId');
    const planId = data.get('planId') || null;
    if (planId) {
      await addExerciseToPlan(exerciseId, planId, locals.userId);
    } else {
      await addExerciseToDraft(exerciseId, locals.userId);
    }
    return { success: true };
  }
};
