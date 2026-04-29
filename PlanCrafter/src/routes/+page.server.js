import { getCollection, serialize, USER_ID } from '$lib/server/db.js';

export async function load() {
  const [plansCol, categoriesCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const [plans, categories, explore] = await Promise.all([
    plansCol.find({ userId: USER_ID }).sort({ createdAt: -1 }).limit(3).toArray(),
    categoriesCol.find().toArray(),
    exercisesCol.find().limit(6).toArray(),
  ]);

  const activePlan = plans[0] ?? null;

  return serialize({ activePlan, plans, categories, explore });
}
