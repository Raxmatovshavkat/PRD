import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) { }

  async saveFile(file: Express.Multer.File): Promise<File> {
    const createFileDto: CreateFileDto = {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    };

    const newFile = this.fileRepository.create(createFileDto);
    return this.fileRepository.save(newFile);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findOne(id: number): Promise<File> {
    return this.fileRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<void> {
    await this.fileRepository.update(id, updateFileDto);
  }

  async remove(id: number): Promise<void> {
    await this.fileRepository.delete(id);
  }
}
