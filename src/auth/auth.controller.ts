import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/signUpAuthDto';
import { LoginAuthDto } from './dto/signInAuthDto';
import { Auth } from './entities/auth.entity';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto): Promise<Auth> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authService.login(loginAuthDto);
  }

  @Post('verify')
  async verify(@Param('id') id: number,@Body('email') email: string){
    return this.authService.verifyOtp(id,email);
  }

  @Post('logout/:id')
  @UseGuards(JwtAuthGuard)
  async logout(@Param('id') id: number): Promise<void> {
    return this.authService.logout(id);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard)
  async getMe(@Param('id') id: number): Promise<Auth> {
    return this.authService.getMe(id);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
