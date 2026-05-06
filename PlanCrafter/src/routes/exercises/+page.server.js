import { getCollection, serialize } from '$lib/server/db.js';
import { addExerciseToDraft } from '$lib/server/planHelper.js';

export const actions = {
  addToPlan: async ({ request }) => {
    const data = await request.formData();
    await addExerciseToDraft(data.get('exerciseId'));
    return { success: true };
  }
};

export async function load({ url }) {
  const activeCategory = url.searchParams.get('category') || null;

  const [exercisesCol, categoriesCol] = await Promise.all([
    getCollection('exercises'),
    getCollection('categories'),
  ]);

  const query = activeCategory ? { categoryId: activeCategory } : {};

  const [exercises, categories] = await Promise.all([
    exercisesCol.find(query).toArray(),
    categoriesCol.find().toArray(),
  ]);

  return serialize({ exercises, categories, activeCategory });
}
