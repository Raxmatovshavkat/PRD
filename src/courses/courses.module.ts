import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { Course } from './entities/course.entity';
import { UserCourse } from 'src/user-courses/entities/user-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,UserCourse])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule { }
