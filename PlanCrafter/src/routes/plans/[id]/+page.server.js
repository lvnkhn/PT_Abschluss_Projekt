import { getCollection, serialize, USER_ID } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const col = await getCollection('plans');
  let plan;
  try {
    plan = await col.findOne({ _id: new ObjectId(params.id), userId: USER_ID });
  } catch {
    throw error(404, 'Plan not found');
  }
  if (!plan) throw error(404, 'Plan not found');
  return serialize({ plan });
}

export const actions = {
  restart: async ({ params }) => {
    const col = await getCollection('plans');
    await col.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status: 'active',
          'exercises.$[].done': false,
        }
      }
    );
    redirect(303, '/plan');
  }
};
