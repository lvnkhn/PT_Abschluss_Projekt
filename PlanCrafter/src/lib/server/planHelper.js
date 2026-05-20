import { getCollection, USER_ID } from './db.js';
import { ObjectId } from 'mongodb';

export async function getOrCreateDraft(userId) {
  userId = userId ?? USER_ID;
  const col = await getCollection('plans');
  let plan = await col.findOne({ userId, status: 'draft' });
  if (!plan) {
    const res = await col.insertOne({
      name: '',
      userId,
      status: 'draft',
      exercises: [],
      createdAt: new Date(),
      lastCompletedAt: null,
    });
    plan = await col.findOne({ _id: res.insertedId });
  }
  return plan;
}

export async function addExerciseToDraft(exerciseId, userId) {
  userId = userId ?? USER_ID;
  const [plansCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('exercises'),
  ]);

  const exercise = await exercisesCol.findOne({ _id: new ObjectId(exerciseId) });
  if (!exercise) return;

  const plan = await getOrCreateDraft(userId);
  if (plan.exercises.some(e => e.exerciseId === exerciseId)) return;

  await plansCol.updateOne(
    { _id: plan._id },
    {
      $push: {
        exercises: {
          exerciseId,
          name: exercise.name,
          categoryId: exercise.categoryId,
          imageUrl: exercise.imageUrl || '',
          done: false,
        }
      }
    }
  );
}

export async function addExerciseToPlan(exerciseId, planId, userId) {
  userId = userId ?? USER_ID;
  const [plansCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('exercises'),
  ]);

  const [plan, exercise] = await Promise.all([
    plansCol.findOne({ _id: new ObjectId(planId), userId }),
    exercisesCol.findOne({ _id: new ObjectId(exerciseId) }),
  ]);

  if (!plan || !exercise) return;
  if (plan.exercises.some(e => e.exerciseId === exerciseId)) return;

  await plansCol.updateOne(
    { _id: new ObjectId(planId) },
    {
      $push: {
        exercises: {
          exerciseId,
          name: exercise.name,
          categoryId: exercise.categoryId,
          imageUrl: exercise.imageUrl || '',
          done: false,
        }
      }
    }
  );
}
