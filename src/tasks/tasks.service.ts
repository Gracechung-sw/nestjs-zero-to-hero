import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { v4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // If you don't define an accessor, public is default.
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskSatus(id: string, status: TaskStatus) {
    const task = this.tasks.find((task) => task.id === id);
    task.status = status;
    return task;
  }
}
