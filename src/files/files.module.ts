import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './files.service';
import { FileController } from './files.controller';
import { File } from './entities/file.entity';
import { UserFile } from 'src/user-files/entities/user-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, UserFile])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule { }
