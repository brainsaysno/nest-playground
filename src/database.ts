import { Kysely, Selectable } from 'kysely';
import { DB } from './schema';

export type TSDB = {
  [K in keyof DB]: Selectable<DB[K]> & { __caslSubjectType__: K };
};

export type Database = Kysely<DB>;
