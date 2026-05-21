import { redirect } from '@sveltejs/kit';
import { getCollection, serialize } from '$lib/server/db.js';
import { deleteSession } from '$lib/server/auth.js';

export async function load({ locals }) {
  if (!locals.username) redirect(303, '/login');

  const users = await getCollection('users');
  const user = await users.findOne({ username: locals.username });

  const logins = user?.logins ?? [];

  return serialize({ username: locals.username, logins });
}

export const actions = {
  logout: async ({ cookies }) => {
    const token = cookies.get('session');
    if (token) {
      await deleteSession(token);
      cookies.delete('session', { path: '/' });
    }
    redirect(303, '/login');
  },
};
