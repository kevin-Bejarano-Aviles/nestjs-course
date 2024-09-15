import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
    user:{
        email: string,
        role: string
    }
}


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}


    @Post('register')
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
  /*   @Roles(Role.ADMIN)
    @UseGuards(AuthGuard,RolesGuard) */
    //? useGuard == verifica que ese token exista, si el token existe lo deja pasar a la ruta
    profile(@Req() req: Request & RequestWithUser ){
        //? el & agrega al objeto de la izquierda con lo de la derecha
        return req.user;
    }
}
