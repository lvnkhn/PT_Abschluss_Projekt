import { getCollection, serialize } from '$lib/server/db.js';
import { addExerciseToDraft } from '$lib/server/planHelper.js';
import { error } from '@sveltejs/kit';

export const actions = {
  addToPlan: async ({ request }) => {
    const data = await request.formData();
    await addExerciseToDraft(data.get('exerciseId'));
    return { success: true };
  }
};

export async function load({ params }) {
  const [categoriesCol, exercisesCol] = await Promise.all([
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const category = await categoriesCol.findOne({ slug: params.slug });
  if (!category) throw error(404, 'Category not found');

  const exercises = await exercisesCol.find({ categoryId: params.slug }).toArray();

  return serialize({ category, exercises });
}
