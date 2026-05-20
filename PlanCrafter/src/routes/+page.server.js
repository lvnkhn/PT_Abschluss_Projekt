import { getCollection, serialize } from '$lib/server/db.js';

export async function load({ locals }) {
  const userId = locals.userId;
  const [plansCol, categoriesCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const [myPlans, allPlans, categories, explore] = await Promise.all([
    plansCol
      .find({ userId, status: { $in: ['active', 'completed'] } })
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    plansCol
      .find({ userId, status: { $in: ['active', 'completed'] } })
      .toArray(),
    categoriesCol.find().toArray(),
    exercisesCol.find().limit(6).toArray(),
  ]);

  const activePlan = await plansCol.findOne(
    { userId, status: 'active' },
    { sort: { lastActivatedAt: -1, createdAt: -1 } }
  );

  // Recommendations based on most-used category in user's plans
  const allPlanCategories = allPlans.flatMap(p => p.exercises.map(e => e.categoryId));
  let recommended = [];
  if (allPlanCategories.length > 0) {
    const catCount = {};
    allPlanCategories.forEach(c => { catCount[c] = (catCount[c] || 0) + 1; });
    const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topCat) {
      recommended = await exercisesCol.find({ categoryId: topCat }).limit(4).toArray();
    }
  }

  return serialize({ activePlan, plans: myPlans, categories, explore, recommended });
}
