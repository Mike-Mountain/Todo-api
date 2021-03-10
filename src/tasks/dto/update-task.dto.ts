import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskPriority, TaskStatus } from '../enums/task.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}
