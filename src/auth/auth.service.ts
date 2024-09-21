import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {


    constructor(
        private readonly userService:UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register(registerDto:RegisterDto){
        const user = await this.userService.findOneByEmail(registerDto.email)
        if (user){
            throw new BadRequestException("User already exists");
        }

        registerDto.password = await bcryptjs.hash(registerDto.password, 10)

        return await this.userService.create(registerDto);
    }
 
    async login(loginDto:LoginDto){
        const user = await this.userService.findByEmailWithPassword(loginDto.email);

        if(!user){
            throw new UnauthorizedException("email is wrong");
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password,user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException("password is wrong");
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email:user.email
        };

        
    }

    async profile ({email, role} : {email:string; role:string}) {
        return await this.userService.findOneByEmail(email); 
    }


}
