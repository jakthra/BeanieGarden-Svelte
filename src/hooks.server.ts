import { getUserFromSession } from '$lib/server/db/queries';

// src/hooks.server.js
export async function handle({ event, resolve }) {
    const sessionUid = event.cookies.get('sessionuid');

    if (sessionUid) {
        const user = await getUserFromSession(sessionUid);

        if (user) {
            event.locals.user = user;
        }
    }

    return resolve(event);
}