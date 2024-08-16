import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(1)
    name: string;
    @IsEmail()
    email: string;


    //@IsStrongPassword()
    @Transform(({value})=> value.trim() )
    @IsString()
    @MinLength(6)
    password: string;
}