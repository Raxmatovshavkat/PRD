import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserCourseService } from './user-courses.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { UpdateUserCourseDto } from './dto/update-user-course.dto';
import { UserCourse } from './entities/user-course.entity';

@Controller('user-courses')
export class UserCourseController {
  constructor(private readonly userCourseService: UserCourseService) { }

  @Post()
  create(@Body() createUserCourseDto: CreateUserCourseDto): Promise<UserCourse> {
    return this.userCourseService.create(createUserCourseDto);
  }

  @Get()
  findAll(): Promise<UserCourse[]> {
    return this.userCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserCourse> {
    return this.userCourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserCourseDto: UpdateUserCourseDto): Promise<void> {
    return this.userCourseService.update(id, updateUserCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userCourseService.remove(id);
  }
}
