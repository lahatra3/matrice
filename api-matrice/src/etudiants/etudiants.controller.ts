import { Body, Controller, Get, NotAcceptableException, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EtudiantsUpdateDto, EtudiantsUpdatePasswordDto } from './dto';
import { EtudiantsService } from './etudiants.service';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private readonly etudiantsService: EtudiantsService) {}

    @UseGuards(AuthGuard('jwtMatrice'))
    @Get()
    async getEtudiants(@Request() req: any) {
        const data = { id: parseInt(req.user.id )};
        return await this.etudiantsService.findOne(data);
    }

    @UseGuards(AuthGuard('jwtMatrice'))
    @Patch('update')
    async updateEtudiants(@Body() donnees: EtudiantsUpdateDto, 
        @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.etudiantsService.update(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwtMatrice'))
    @Patch('update-password')
    async updateEtudiantsPassword(@Body() donnees: EtudiantsUpdatePasswordDto,
        @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.etudiantsService.updatePassword(parseInt(req.user.id), donnees);
    }
}
