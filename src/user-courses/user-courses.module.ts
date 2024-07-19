// src/user-course/user-course.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserCourseController } from './user-courses.controller';
import { UserCourse } from './entities/user-course.entity';
import { Auth } from '../auth/entities/auth.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse, Auth, Course])],
  providers: [AuthService],
  controllers: [UserCourseController],
})
export class UserCourseModule { }
