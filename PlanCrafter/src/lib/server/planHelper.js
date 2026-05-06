import { getCollection, USER_ID } from './db.js';
import { ObjectId } from 'mongodb';

export async function getOrCreateDraft() {
  const col = await getCollection('plans');
  let plan = await col.findOne({ userId: USER_ID, status: 'draft' });
  if (!plan) {
    const res = await col.insertOne({
      name: '',
      userId: USER_ID,
      status: 'draft',
      exercises: [],
      createdAt: new Date(),
      lastCompletedAt: null,
    });
    plan = await col.findOne({ _id: res.insertedId });
  }
  return plan;
}

export async function addExerciseToDraft(exerciseId) {
  const [plansCol, exercisesCol] = await Promise.all([
    getCollection('plans'),
    getCollection('exercises'),
  ]);

  const exercise = await exercisesCol.findOne({ _id: new ObjectId(exerciseId) });
  if (!exercise) return;

  const plan = await getOrCreateDraft();
  const alreadyAdded = plan.exercises.some(e => e.exerciseId === exerciseId);
  if (alreadyAdded) return;

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
