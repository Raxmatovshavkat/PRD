// src/user-file/user-file.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserFileService } from './user-file.service';
import { CreateUserFileDto } from './dto/create-user-file.dto';
import { UpdateUserFileDto } from './dto/update-user-file.dto';

@Controller('user-files')
export class UserFileController {
  constructor(private readonly userFileService: UserFileService) { }

  @Post()
  create(@Body() createUserFileDto: CreateUserFileDto): Promise<UserFile> {
    return this.userFileService.create(createUserFileDto);
  }

  @Get()
  findAll(): Promise<UserFile[]> {
    return this.userFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserFile> {
    return this.userFileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserFileDto: UpdateUserFileDto): Promise<void> {
    return this.userFileService.update(id, updateUserFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userFileService.remove(id);
  }
}
