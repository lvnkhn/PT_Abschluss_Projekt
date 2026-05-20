import { getCollection, serialize } from '$lib/server/db.js';
import { addExerciseToDraft, addExerciseToPlan } from '$lib/server/planHelper.js';

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

export async function load({ url, locals }) {
  const userId = locals.userId;
  const activeCategory = url.searchParams.get('category') || null;
  const searchQuery = url.searchParams.get('q') || null;

  const [exercisesCol, categoriesCol, plansCol] = await Promise.all([
    getCollection('exercises'),
    getCollection('categories'),
    getCollection('plans'),
  ]);

  const query = activeCategory ? { categoryId: activeCategory } : {};

  const [exercises, categories, plans] = await Promise.all([
    exercisesCol.find(query).toArray(),
    categoriesCol.find().toArray(),
    plansCol
      .find({ userId, status: 'active' })
      .sort({ lastActivatedAt: -1 })
      .limit(5)
      .toArray(),
  ]);

  return serialize({ exercises, categories, activeCategory, searchQuery, plans });
}
