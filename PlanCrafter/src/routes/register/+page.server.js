import { getCollection } from '$lib/server/db.js';
import { hashPassword, createSession } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.trim();
    const password = data.get('password');
    const confirm = data.get('confirm');

    if (!username || !password) return fail(400, { error: 'Alle Felder ausfüllen.' });
    if (username.length < 3) return fail(400, { error: 'Benutzername muss mindestens 3 Zeichen haben.' });
    if (password.length < 6) return fail(400, { error: 'Passwort muss mindestens 6 Zeichen haben.' });
    if (password !== confirm) return fail(400, { error: 'Passwörter stimmen nicht überein.' });

    const users = await getCollection('users');
    const existing = await users.findOne({ username });
    if (existing) return fail(409, { error: 'Benutzername bereits vergeben.' });

    await users.insertOne({ username, passwordHash: hashPassword(password), createdAt: new Date() });

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
