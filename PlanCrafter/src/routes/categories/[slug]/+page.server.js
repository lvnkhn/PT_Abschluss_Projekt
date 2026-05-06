import { getCollection, serialize } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

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
