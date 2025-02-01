import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from './database';

@Injectable()
export class AppService {
  constructor(@InjectKysely() private readonly kysely: Database) {}

  async getHello(): Promise<string> {
    const user = await this.kysely.selectFrom('users').selectAll().executeTakeFirst();
    return user?.user_id ?? 'No user found';
  }
}
