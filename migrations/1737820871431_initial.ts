import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);

  await db.schema
    .createType('user_role')
    .asEnum(['user', 'manager', 'admin'])
    .execute();

  await db.schema
    .createTable('users')
    .addColumn('user_id', 'uuid', (cb) =>
      cb
        .defaultTo(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    )
    .addColumn('email', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('password', 'varchar', (cb) => cb.notNull())
    .addColumn('created_at', 'timestamp', (cb) => cb.defaultTo(sql`now()`))
    .addColumn('role', sql`user_role`, (cb) => cb.notNull().defaultTo('user'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
  await db.schema.dropType('user_role').execute();
  await sql`DROP EXTENSION IF EXISTS "uuid-ossp"`.execute(db);
}
