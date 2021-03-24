import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isEqual = compare(user.password, password);
    if (!isEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async login(data: UpdateUserDto) {
    const payload = await this.userService.findOne({
      where: { username: data.username },
    });
    const { password, hashPassword, ...redactedUser } = payload;
    return {
      accessToken: this.jwtService.sign(redactedUser),
    };
  }

  async register(user: CreateUserDto) {
    const exists = await this.userService.findOne({
      where: { username: user.username },
    });
    if (exists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(user);
  }
}
