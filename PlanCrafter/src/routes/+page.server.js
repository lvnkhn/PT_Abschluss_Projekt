import { getCollection, serialize, USER_ID } from '$lib/server/db.js';

export async function load() {
  const [plansCol, categoriesCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const [myPlans, categories, explore] = await Promise.all([
    plansCol
      .find({ userId: USER_ID, status: { $in: ['active', 'completed'] } })
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    categoriesCol.find().toArray(),
    exercisesCol.find().limit(6).toArray(),
  ]);

  const activePlan = await plansCol.findOne(
    { userId: USER_ID, status: 'active' },
    { sort: { lastActivatedAt: -1, createdAt: -1 } }
  );
  return serialize({ activePlan, plans: myPlans, categories, explore });
}
