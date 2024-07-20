import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseController } from './user-courses.controller';
import { UserCourse } from './entities/user-course.entity';
import { Auth } from '../auth/entities/auth.entity';
import { Course } from '../courses/entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserCourseService } from './user-courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse, Auth, Course]),
  AuthModule],
  providers: [UserCourseService],
  controllers: [UserCourseController],
})
export class UserCourseModule { }
