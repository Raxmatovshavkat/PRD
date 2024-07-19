// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { SignInAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) { }

  async signUp(signInAuthDto: SignInAuthDto): Promise<Auth> {
    const auth = this.authRepository.create(signInAuthDto);
    return this.authRepository.save(auth);
  }

  async signIn(signInAuthDto: SignInAuthDto): Promise<Auth | null> {
    const { email, password } = signInAuthDto;
    const auth = await this.authRepository.findOne({ where: { email, password } });
    return auth;
  }

  async verify(id: number): Promise<Auth | null> {
    const auth = await this.authRepository.findOne({ where: { id } });
    return auth;
  }

  async logout(id: number): Promise<void> {
    await this.authRepository.update(id, { isActive: false });
  }

  async refresh(id: number): Promise<Auth | null> {
    const auth = await this.authRepository.findOne({ where: { id } });
    return auth;
  }

  async getMe(id: number): Promise<Auth | null> {
    const auth = await this.authRepository.findOne({ where: { id } });
    return auth;
  }
}
