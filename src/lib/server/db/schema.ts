import { pgTable, serial, integer, uuid, varchar, boolean, timestamp} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	uid: uuid('uid').primaryKey(),
	email: varchar().notNull(),
	active: boolean().default(true),
	created_at: timestamp().defaultNow(),
	pw_hash: varchar()
});
