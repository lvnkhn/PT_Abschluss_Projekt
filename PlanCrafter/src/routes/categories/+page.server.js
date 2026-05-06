import { getCollection, serialize } from '$lib/server/db.js';

export async function load() {
  const [categoriesCol, exercisesCol] = await Promise.all([
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const categories = await categoriesCol.find().toArray();

  const counts = await exercisesCol.aggregate([
    { $group: { _id: '$categoryId', count: { $sum: 1 } } }
  ]).toArray();

  const countMap = Object.fromEntries(counts.map(c => [c._id, c.count]));

  const result = categories.map(cat => ({
    ...cat,
    exerciseCount: countMap[cat.slug] ?? 0,
  }));

  return serialize({ categories: result });
}
