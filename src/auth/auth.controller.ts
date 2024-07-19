// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signUp(@Body()signInAuthDto:SignInAuthDto): Promise<Auth> {
    return this.authService.signUp(signInAuthDto);
  }

  @Post('signin')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<Auth | null> {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('verify/:id')
  verify(@Param('id') id: number): Promise<Auth | null> {
    return this.authService.verify(id);
  }

  @Post('logout/:id')
  logout(@Param('id') id: number): Promise<void> {
    return this.authService.logout(id);
  }

  @Post('refresh/:id')
  refresh(@Param('id') id: number): Promise<Auth | null> {
    return this.authService.refresh(id);
  }

  @Get('me/:id')
  getMe(@Param('id') id: number): Promise<Auth | null> {
    return this.authService.getMe(id);
  }
}
