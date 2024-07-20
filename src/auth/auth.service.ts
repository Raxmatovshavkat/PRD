import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { RegisterAuthDto } from './dto/signUpAuthDto';
import { LoginAuthDto } from './dto/signInAuthDto';
import { RefreshTokenService } from '../token/token.service';
import { OtpService } from '../otp/otp.service';
import { EmailService } from '../mail/mail.service';  
import * as bcrypt from 'bcrypt';
import otpGenerator from "otp-generator"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService, 
  ) { }

  async register(registerAuthDto: RegisterAuthDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
    const user = this.authRepository.create({ ...registerAuthDto, password: hashedPassword });
    const savedUser = await this.authRepository.save(user);

    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,Number:true });

    await this.otpService.saveOtp({ userId: savedUser.id, otp });

    await this.emailService.sendEmail(savedUser.email, otp);

    return savedUser;
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string, refreshToken: string }> {
    const { email, password } = loginAuthDto;
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.DATABASE_ACCESS_TOKEN_SECRET, expiresIn: process.env.DATABASE_ACCES_expiresIn });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.DATABASE_REFRESH_TOKEN_SECRET, expiresIn: process.env.DATABASE_REFRESH_expiresIn });

    await this.refreshTokenService.storeRefreshToken({ token: refreshToken, userId: user.id, expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });

    return { accessToken, refreshToken };
  }

  async verifyOtp(userId: number, otp: string): Promise<void> {
    const user=this.otpService.verifyOtp(userId, otp);
    if (!user){
      throw new UnauthorizedException()
    }
    await this.authRepository.update(userId,{isActive:"active"})
  }

  async logout(userId: number){
    return await this.refreshTokenService.removeTokensForUser(userId);
  }

  async getMe(userId: number): Promise<Auth> {
    const user=this.authRepository.findOne({ where: { id: userId } });
    if (!user){
      throw new NotFoundException()
    }
    return user
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    return this.refreshTokenService.refreshAccessToken(refreshToken);
  }
}
