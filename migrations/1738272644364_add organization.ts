import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('organizations')
    .addColumn('organization_id', 'uuid', (cb) =>
      cb
        .defaultTo(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    )
    .execute();

  await db.schema
    .createTable('organization_users')
    .addColumn('organization_id', 'uuid', (cb) =>
      cb.references('organizations.organization_id').notNull(),
    )
    .addColumn('user_id', 'uuid', (cb) =>
      cb.references('users.user_id').notNull(),
    )
    .addColumn('joined_at', 'timestamp', (cb) => cb.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('organization_users').execute();
  await db.schema.dropTable('organizations').execute();
}
