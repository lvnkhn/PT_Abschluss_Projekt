import { getCollection, serialize } from '$lib/server/db.js';

function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function load({ locals }) {
  const userId = locals.userId;
  const [plansCol, categoriesCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('categories'),
    getCollection('exercises'),
  ]);

  const [myPlans, allPlans, categories, allExercises] = await Promise.all([
    plansCol
      .find({ userId, status: { $in: ['active', 'completed'] } })
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    plansCol
      .find({ userId, status: { $in: ['active', 'completed'] } })
      .toArray(),
    categoriesCol.find().toArray(),
    exercisesCol.find().toArray(),
  ]);

  const activePlan = await plansCol.findOne(
    { userId, status: 'active' },
    { sort: { lastActivatedAt: -1, createdAt: -1 } }
  );

  // Recommendations based on most-used category
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

  // Date-seeded random exercises for carousel (3 slides × 8 = 24)
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const shuffled = seededShuffle(allExercises, seed);
  const carouselSlides = [
    shuffled.slice(0, 8),
    shuffled.slice(8, 16),
    shuffled.slice(16, 24),
  ];

  return serialize({ activePlan, plans: myPlans, categories, carouselSlides, recommended });
}
