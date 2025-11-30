import * as schema from './schema'
import { db } from '.'
import { and, eq, gt, lt } from 'drizzle-orm'

export async function findUserByEmail(email: string) {
  return db.query.user.findFirst({
    where: eq(schema.user.email, email),
  })
}

export async function createSession(user_uid: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);
  const [session] = await db.insert(schema.session).values({ user_uid: user_uid, expires_at: expiresAt }).returning()
  return session
}

export async function getUserFromSession(session_uid: string) {
  const session = await db.query.session.findFirst({
    where: and(
      eq(schema.session.uid, session_uid),
      gt(schema.session.expires_at, new Date())
    )
  })

  if (!session) return null;

  return db.query.user.findFirst({
    where: eq(schema.user.uid, session.user_uid)
  })
}