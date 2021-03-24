import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { UserEntity } from '../../users/entity/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
    const task = new CreateTaskDto(createTaskDto, user);
    const taskEntity = this.taskRepository.create(task);
    return await this.taskRepository.save(taskEntity);
  }

  async findAll(user: UserEntity): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { ownerId: user.id },
    });
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskRepository.update(id, updateTaskDto);
    if (updated) {
      return updateTaskDto;
    }
  }

  remove(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }
}
