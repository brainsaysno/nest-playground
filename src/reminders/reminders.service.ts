import { Injectable, Logger } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  create(createReminderDto: CreateReminderDto) {
    const callback = () => {
      this.logger.log("Reminded of something")
    }

    const timeout = setTimeout(callback, createReminderDto.delay);
    this.schedulerRegistry.addTimeout(createReminderDto.id, timeout);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  checkReminders() {
    this.logger.log("Checking reminders")
  }

  findAll() {
    return `This action returns all reminders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reminder`;
  }

  update(id: number, updateReminderDto: UpdateReminderDto) {
    return `This action updates a #${id} reminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminder`;
  }
}
