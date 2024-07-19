// src/file/file.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) { }

  async saveFile(file: Express.Multer.File): Promise<File> {
    const newFile = this.fileRepository.create({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    });
    return this.fileRepository.save(newFile);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findOne(id: number): Promise<File> {
    return this.fileRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.fileRepository.delete(id);
  }
}
