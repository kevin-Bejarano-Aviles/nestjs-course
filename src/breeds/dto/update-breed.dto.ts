import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateBreedDto {
    @IsString()
    @MinLength(3)
    name?:string
}
