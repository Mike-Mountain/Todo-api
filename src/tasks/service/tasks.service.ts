import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task | Error> {
    return this.taskRepository.save(createTaskDto).catch((err) => {
      return new Error(err);
    });
  }

  findAll(): Promise<Task[] | Error> {
    return this.taskRepository.find().catch((err) => {
      return new Error(err);
    });
  }

  findOne(id: number): Promise<Task | Error> {
    return this.taskRepository.findOne(id).catch((err) => {
      return new Error(err);
    });
  }

  update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult | Error> {
    return this.taskRepository.update(id, updateTaskDto).catch((err) => {
      return new Error(err);
    });
  }

  remove(id: number): Promise<DeleteResult | Error> {
    return this.taskRepository.delete(id).catch((err) => {
      return new Error(err);
    });
  }
}
