import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './signUpAuthDto';

export class UpdateAuthDto extends PartialType(RegisterAuthDto) { }
