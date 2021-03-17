import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options?: Record<string, unknown>): Promise<UserEntity> {
    return await this.userRepository.findOne(options);
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const exists = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (exists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const userEntity: UserEntity = await this.userRepository.create(user);
    await this.userRepository.save(userEntity);
    return userEntity;
  }
}
