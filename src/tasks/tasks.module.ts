import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserEntity } from '../users/entity/user.entity';
import { UsersService } from '../users/service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, UserEntity])],
  controllers: [TasksController],
  providers: [TasksService, UsersService],
})
export class TasksModule {}
