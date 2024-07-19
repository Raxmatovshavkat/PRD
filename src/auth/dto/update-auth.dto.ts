import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './signInAuthDto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) { }
