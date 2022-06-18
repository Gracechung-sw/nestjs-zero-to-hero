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
  private tasks: Task[] = [];
  // If you don't define an accessor, public is default.
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
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

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find((task) => task.id === id);
    task.status = status;
    return task;
  }
}
