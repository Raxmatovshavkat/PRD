// src/user-file/user-file.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFileService } from './user-files.service';
import { UserFileController } from './user-files.controller';
import { UserFile } from './entities/user-file.entity';
import { Auth } from '../auth/entities/auth.entity';
import { File } from '../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFile, Auth, File])],
  providers: [UserFileService],
  controllers: [UserFileController],
})
export class UserFileModule { }
