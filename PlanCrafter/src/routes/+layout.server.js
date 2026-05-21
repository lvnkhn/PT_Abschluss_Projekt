import { getCollection, serialize } from '$lib/server/db.js';

export async function load({ locals }) {
  const exercisesCol = await getCollection('exercises');
  const categoriesCol = await getCollection('categories');

  const [exercises, categories] = await Promise.all([
    exercisesCol.find({}, { projection: { name: 1, categoryId: 1 } }).toArray(),
    categoriesCol.find({}, { projection: { name: 1, slug: 1 } }).toArray(),
  ]);

  return serialize({
    username: locals.username,
    searchData: {
      exercises: exercises.map(e => ({ id: e._id, name: e.name, categoryId: e.categoryId })),
      categories: categories.map(c => ({ name: c.name, slug: c.slug })),
    },
  });
}
