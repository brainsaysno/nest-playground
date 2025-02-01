import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { KyselyModule } from 'nestjs-kysely';
import { EnvService } from './env/env.service';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { RemindersModule } from './reminders/reminders.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
      isGlobal: true,
    }),
    EnvModule,
    KyselyModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString: env.get('DATABASE_URL'),
          }),
        }),
      }),
    }),
    RemindersModule,
    UsersModule,
    CaslModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
