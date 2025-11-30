import * as schema from './schema'
import { db } from '.'
import { and, eq } from 'drizzle-orm'

export async function findUserByEmailAndHash(email: string, pwHash: string) {
  return db.query.user.findFirst({
    where: and(
      eq(schema.user.email, email),
      eq(schema.user.pw_hash, pwHash)
    )
  })
}