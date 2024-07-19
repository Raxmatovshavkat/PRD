import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto): Promise<void> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.courseService.remove(id);
  }
}
