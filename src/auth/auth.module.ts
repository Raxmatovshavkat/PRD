import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { RefreshTokenModule } from 'src/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    RefreshTokenModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
