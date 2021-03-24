import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskCategory, TaskPriority, TaskStatus } from '../enums/task.enum';
import { UserEntity } from '../../users/entity/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: '' })
  category: TaskCategory;

  @Column()
  priority: TaskPriority;

  @Column({ default: TaskStatus.TODO })
  status: TaskStatus;

  @ManyToOne((type) => UserEntity)
  ownerId?: number;
}
