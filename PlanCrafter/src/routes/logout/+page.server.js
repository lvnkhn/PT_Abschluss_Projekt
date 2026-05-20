import { deleteSession } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies }) => {
    const token = cookies.get('session');
    if (token) {
      await deleteSession(token);
      cookies.delete('session', { path: '/' });
    }
    redirect(303, '/login');
  }
};
