// src/user-file/dto/create-user-file.dto.ts
import { IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserFileDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    fileId: number;

    @IsDate()
    uploadDate: Date;

    @IsBoolean()
    isActive: boolean;
}
