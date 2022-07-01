import { Body, Controller, ForbiddenException, 
    NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, EtudiantsCreateDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async signin(@Body() donnees: AuthDto) {
        if(!donnees) throw new ForbiddenException("Credentials incorrects !");
        return await this.authService.authEtudiants(donnees);
    }

    @Post('signup')
    async signup(@Body() donnees: EtudiantsCreateDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.authService.createEtudiants(donnees);
    }
}
