
import { IsString, IsEmail } from 'class-validator';

export class SignInAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
