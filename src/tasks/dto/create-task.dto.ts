import { TaskPriority, TaskStatus } from '../enums/task.enum';
import { UserEntity } from '../../users/entity/user.entity';

export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  owner: Omit<UserEntity, 'password' | 'hashPassword'>;

  constructor(params: CreateTaskDto, user: UserEntity) {
    this.title = params.title;
    this.description = params.description;
    this.priority = params.priority;
    this.status = params.status;
    this.owner = {
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
    };
  }
}
