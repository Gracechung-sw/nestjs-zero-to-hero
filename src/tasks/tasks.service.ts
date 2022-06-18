import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

import { v4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  // Now we interact with a database, async operation.
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    // try to get task
    // If not found, throw an error 404 not found.
    // otherwise, return the found task.
    const found = await this.tasksRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      return found;
    }
  }

  createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
