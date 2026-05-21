import { getCollection, serialize } from '$lib/server/db.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
  const categoriesCol = await getCollection('categories');
  const categories = await categoriesCol.find({}).sort({ name: 1 }).toArray();
  return serialize({ categories });
}

export const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const categoryId = data.get('categoryId')?.toString().trim();
    const referenceUrl = data.get('referenceUrl')?.toString().trim() || null;
    const bodyParts = data.getAll('bodyParts').map(s => s.toString());

    if (!name || name.length < 2) {
      return fail(400, { error: 'Name muss mindestens 2 Zeichen lang sein.' });
    }
    if (!categoryId) {
      return fail(400, { error: 'Bitte eine Kategorie auswählen.' });
    }

    const exercisesCol = await getCollection('exercises');
    await exercisesCol.insertOne({
      name,
      categoryId,
      bodyParts,
      referenceUrl,
      isCustom: true,
      userId: locals.username ?? 'demo',
      createdAt: new Date(),
    });

    redirect(303, '/exercises');
  },
};
