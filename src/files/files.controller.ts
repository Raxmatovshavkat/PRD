import { Controller, Post, Get, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './files.service';
import { File } from './entities/file.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<File> {
    return this.fileService.saveFile(file);
  }

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<File> {
    return this.fileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.fileService.remove(id);
  }
}
