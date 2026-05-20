import { getSession } from '$lib/server/auth.js';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('session');
  const session = await getSession(token);
  if (session) {
    event.locals.userId = session.username;
    event.locals.username = session.username;
  } else {
    event.locals.userId = 'demo';
    event.locals.username = null;
  }
  return resolve(event);
}
