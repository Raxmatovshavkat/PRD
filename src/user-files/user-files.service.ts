// src/user-file/user-file.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFile } from './user-file.entity';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';

@Injectable()
export class UserFileService {
  constructor(
    @InjectRepository(UserFile)
    private userFileRepository: Repository<UserFile>,
  ) { }

  async create(createUserFileDto: CreateUserFileDto): Promise<UserFile> {
    const userFile = this.userFileRepository.create(createUserFileDto);
    return this.userFileRepository.save(userFile);
  }

  async findAll(): Promise<UserFile[]> {
    return this.userFileRepository.find({ relations: ['user', 'file'] });
  }

  async findOne(id: number): Promise<UserFile> {
    return this.userFileRepository.findOne({ where: { id }, relations: ['user', 'file'] });
  }

  async update(id: number, updateUserFileDto: UpdateUserFileDto): Promise<void> {
    await this.userFileRepository.update(id, updateUserFileDto);
  }

  async remove(id: number): Promise<void> {
    await this.userFileRepository.delete(id);
  }
}
