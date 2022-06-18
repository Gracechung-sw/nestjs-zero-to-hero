// This entity file will help us maintain the shape of our task in the database in the form of code.

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// So this Task class represent an entity in the database.
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') // TypeORM automatically generates the ID for our tasks and treat it as the primary column.
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
