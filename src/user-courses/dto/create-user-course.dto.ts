// src/user-course/dto/create-user-course.dto.ts
import { IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserCourseDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    courseId: number;

    @IsDate()
    enrollmentDate: Date;

    @IsBoolean()
    isActive: boolean;
}
