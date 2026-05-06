import { getCollection, serialize } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const [exercisesCol, categoriesCol] = await Promise.all([
    getCollection('exercises'),
    getCollection('categories'),
  ]);

  let exercise;
  try {
    exercise = await exercisesCol.findOne({ _id: new ObjectId(params.id) });
  } catch {
    throw error(404, 'Exercise not found');
  }

  if (!exercise) throw error(404, 'Exercise not found');

  const category = await categoriesCol.findOne({ slug: exercise.categoryId });

  return serialize({ exercise, category });
}
