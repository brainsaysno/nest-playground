import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Database } from 'src/database';
import { InjectKysely } from 'nestjs-kysely';

@Injectable()
export class UsersService {
  constructor(@InjectKysely() private readonly db: Database) {}

  create(createUserDto: CreateUserDto) {
    return this.db.insertInto('users').values(createUserDto).executeTakeFirst();
  }

  findAll() {
    return this.db.selectFrom('users').selectAll().execute();
  }

  findOne(id: string) {
    return this.db
      .selectFrom('users')
      .selectAll()
      .where('user_id', '=', id)
      .executeTakeFirst();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.db
      .updateTable('users')
      .set(updateUserDto)
      .where('user_id', '=', id)
      .executeTakeFirst();
  }

  remove(id: string) {
    return this.db
      .deleteFrom('users')
      .where('user_id', '=', id)
      .executeTakeFirst();
  }
}
