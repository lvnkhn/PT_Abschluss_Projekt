import { getCollection, serialize } from '$lib/server/db.js';
import { addExerciseToDraft, addExerciseToPlan } from '$lib/server/planHelper.js';
import { error } from '@sveltejs/kit';

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

export async function load({ params, locals }) {
  const userId = locals.userId;
  const [categoriesCol, exercisesCol, plansCol] = await Promise.all([
    getCollection('categories'),
    getCollection('exercises'),
    getCollection('plans'),
  ]);

  const category = await categoriesCol.findOne({ slug: params.slug });
  if (!category) throw error(404, 'Category not found');

  const [exercises, plans] = await Promise.all([
    exercisesCol.find({ categoryId: params.slug }).toArray(),
    plansCol.find({ userId, status: 'active' }).sort({ lastActivatedAt: -1 }).limit(5).toArray(),
  ]);

  return serialize({ category, exercises, plans });
}
