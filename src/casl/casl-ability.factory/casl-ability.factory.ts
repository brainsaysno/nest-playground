import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { TSDB } from 'src/database';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type AppSubjects =
  | 'all'
  | {
      [K in keyof TSDB]: InferSubjects<TSDB[K]>;
    }[keyof TSDB];

export type AppAbility = MongoAbility<[Action, AppSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityFor(user: Omit<TSDB['users'], '__caslSubjectType__'>) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === 'admin') {
      can(Action.Manage, 'all');
    } else if (user.role === 'manager') {
      can(Action.Read, 'all');
      can(Action.Manage, 'users', { user_id: { $eq: user.user_id } });
    } else {
      can(Action.Read, 'all');
    }

    return build();
  }
}
