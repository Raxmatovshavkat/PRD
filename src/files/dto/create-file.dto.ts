import { IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    originalname: string;

    @IsString()
    filename: string;

    @IsString()
    path: string;

    @IsString()
    mimetype: string;

    @IsString()
    size: number;
}
