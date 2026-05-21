import { getCollection } from '$lib/server/db.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.trim();
    const password = data.get('password');

    if (!username || !password) return fail(400, { error: 'Alle Felder ausfüllen.' });

    const users = await getCollection('users');
    const user = await users.findOne({ username });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return fail(401, { error: 'Ungültiger Benutzername oder Passwort.' });
    }

    // Track login date for contribution map
    await users.updateOne(
      { username },
      { $push: { logins: new Date() } }
    );

    const token = await createSession(username);
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
    });
    redirect(303, '/');
  }
};
