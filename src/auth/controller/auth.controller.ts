import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body) {
    return await this.authService.register(body);
  }
}
