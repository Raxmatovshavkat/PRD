import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    time: string;

    @IsString()
    @IsOptional()
    description?: string;
}
