import { TaskPriority, TaskStatus } from '../enums/task.enum';

export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}
