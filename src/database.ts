import { Kysely } from 'kysely';
import { DB } from './schema';

export type Database = Kysely<DB>;
