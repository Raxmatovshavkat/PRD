// src/user-course/user-course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from './entities/user-course.entity';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { UpdateUserCourseDto } from './dto/update-user-course.dto';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,
  ) { }

  async create(createUserCourseDto: CreateUserCourseDto): Promise<UserCourse> {
    const userCourse = this.userCourseRepository.create(createUserCourseDto);
    return this.userCourseRepository.save(userCourse);
  }

  async findAll(): Promise<UserCourse[]> {
    return this.userCourseRepository.find({ relations: ['user', 'course'] });
  }

  async findOne(id: number): Promise<UserCourse> {
    return this.userCourseRepository.findOne({ where: { id }, relations: ['user', 'course'] });
  }

  async update(id: number, updateUserCourseDto: UpdateUserCourseDto): Promise<void> {
    await this.userCourseRepository.update(id, updateUserCourseDto);
  }

  async remove(id: number): Promise<void> {
    await this.userCourseRepository.delete(id);
  }
}
