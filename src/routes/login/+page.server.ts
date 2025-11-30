import { findUserByEmailAndHash } from '$lib/server/db/queries';
import { fail } from '@sveltejs/kit';
import { saltAndHashPassword } from '../../utils';
import type { Actions } from './$types';

export const actions = {
	default: async ({cookies, request}) => {
		
        const data = await request.formData();
        
		const email = data.get('email');
		const password = data.get('password');

        if (!email || !password) {
            return fail(400, { error: 'Email and password are required' });
        }

        const pwHash = await saltAndHashPassword(password as string)
		const user = await findUserByEmailAndHash(email as string, pwHash);
        if (!user) {
            return fail(401, { error: 'Invalid credentials' });
        }
        console.log(user)
		// cookies.set('sessionid', await db.createSession(user), { path: '/' });

		return { success: true };
	},
} satisfies Actions;