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
