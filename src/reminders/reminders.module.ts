import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [RemindersController],
  imports: [
    ScheduleModule.forRoot(),
  ],
  providers: [RemindersService],
})
export class RemindersModule {}
