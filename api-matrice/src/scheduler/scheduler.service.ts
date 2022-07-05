import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'exceljs'; 
import { Etudiants, MatricesData } from 'src/output';
import { Repository } from 'typeorm';
import { DataMatriceDto } from './dto';

@Injectable()
export class SchedulerService {
    private workbook = new Workbook();

    constructor(
        @InjectRepository(MatricesData)
        private matricesRepository: Repository<MatricesData>,
        private mailerService: MailerService
    ) {}

    private async findMatrices(): Promise<DataMatriceDto[]> {
        return await this.matricesRepository
        .createQueryBuilder("m")
        .select([
            "e.prenom_usuel as prenom_usuel", "e.ecole as ecole", 
            "e.promotion as promotion", "m.inscription as inscription", 
            "m.fourniture as fourniture", "m.ecolage as ecolage", 
            "m.frais_cyber as frais_cyber", "m.trajet_ville as trajet_ville", 
            "m.trajet_region as trajet_region", "m.voyage_etude as voyage_etude", 
            "m.stage as stage", "m.autres_frais as autres_frais", 
            "m.explications as explications", "m.biblio as biblio"
        ])
        .innerJoin(Etudiants, "e", "m.id_etudiants=e.id")
        .where(`m.date_creation <= SYSDATE() 
            AND m.date_creation >= DATE_SUB(SYSDATE(), INTERVAL 2 MONTH)`)
        .getRawMany();
    }

    private async writeData(pathFile: string, matrices: DataMatriceDto[]): Promise<void> {
        await this.workbook.xlsx.readFile(pathFile)
        .then(() => {
            const worksheet = this.workbook.getWorksheet(1);
            let index: number = 0;
            for(let data of matrices) {
                let row = worksheet.getRow(index+4);
                let compteur: number = 0
                for(let item in data) {
                    row.getCell(compteur).value = data[item];
                    compteur++;
                }
                row.getCell(compteur).value = row.getCell(compteur).value;
                row.commit();
                index++;
            }
            return this.workbook.xlsx.writeFile(pathFile)
        });
    }



    @Cron('* * * * *')
    async launchTasks(): Promise<void> {
        const matrices: DataMatriceDto[] = await this.findMatrices();
        const pathFile: string = './uploads/Matrice_foyer_lord.xlsx';
        if(matrices) {
            this.writeData(pathFile, matrices);
        }
       await this.mailerService.sendMail({
            to: process.env.GMAIL_DEST,
            from: process.env.GMAIL_USER,
            subject: 'Nestjs sending mail !',
            html: "<h1>Greeting citizens of the world.</h1>"
        });
    }
}
