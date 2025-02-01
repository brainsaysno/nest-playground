import { InsertExpression } from 'kysely/dist/cjs/parser/insert-values-parser';
import { DB } from 'src/schema';

export type CreateUserDto = InsertExpression<DB, 'users'>;
