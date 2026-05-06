import { getCollection, serialize, USER_ID } from '$lib/server/db.js';

export async function load() {
  const [plansCol, categoriesCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const [activePlan, myPlans, categories, explore] = await Promise.all([
    plansCol.findOne({ userId: USER_ID, status: { $in: ['draft', 'active'] } }),
    plansCol
      .find({ userId: USER_ID, status: { $in: ['active', 'completed'] } })
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    categoriesCol.find().toArray(),
    exercisesCol.find().limit(6).toArray(),
  ]);

  return serialize({ activePlan, plans: myPlans, categories, explore });
}
