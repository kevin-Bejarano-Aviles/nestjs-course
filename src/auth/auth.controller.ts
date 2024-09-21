import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

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
    profile(/* @Req() req: Request & RequestWithUser */@ActiveUser() user: UserActiveInterface ){
        //? el & agrega al objeto de la izquierda con lo de la derecha
        return this.authService.profile(user);
    }
}
