import { Body, Controller, Get, NotAcceptableException, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MatricesCreateDto, MatricesUpdateDto } from './dto';
import { MatricesDataService } from './matrices-data.service';

@Controller('matrices-data')
export class MatricesDataController {
    constructor(private matricesDataService: MatricesDataService) {}

    @UseGuards(AuthGuard('jwtMatrice'))
    @Get()
    async getMatriceData(@Request() req: any) {
        const data = { id: parseInt(req.user.id) };
        return this.matricesDataService.findOne(data);
    }

    @UseGuards(AuthGuard('jwtMatrice'))
    @Post('matrice')
    async createMatrice(@Body() donnees: MatricesCreateDto,
        @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.matricesDataService.create(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwtMatrice'))
    @Put('update')
    async updateMatrice(@Body() donnees: MatricesUpdateDto,
        @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.matricesDataService.update(parseInt(req.user.id), donnees);
    }
}
