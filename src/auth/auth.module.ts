import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { OtpModule } from '../otp/otp.module'; // Import OtpModule // Import RefreshTokenModule
import { RefreshTokenModule } from 'src/token/token.module';
import { EmailService } from 'src/mail/mail.service';
import { UserCourse } from 'src/user-courses/entities/user-course.entity';
import { UserFile } from 'src/user-files/entities/user-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth,UserCourse,UserFile]),
    // JwtModule.register({
    //   secret: 'your-secret-key', // Use environment variables for secrets
    //   signOptions: { expiresIn: '60s' },
    // }),
    OtpModule,
    RefreshTokenModule, 
  ],
  providers: [
    AuthService,
    EmailService, 
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
