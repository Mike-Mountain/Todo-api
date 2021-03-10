import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority, TaskStatus } from '../enums/task.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: TaskPriority;

  @Column({ default: TaskStatus.TODO })
  status: TaskStatus;
}
