import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // If you don't define an accessor, public is default.
  getAllTasks(): Task[] {
    return this.tasks;
  }
}
