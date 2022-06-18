import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus) // NestJS will validate the status property is at least one of those values.
  status: TaskStatus;
}
