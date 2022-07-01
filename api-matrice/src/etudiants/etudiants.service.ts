import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiants } from 'src/output';
import { Repository } from 'typeorm';
import { EtudiantsUpdateDto, EtudiantsUpdatePasswordDto } from './dto';

@Injectable()
export class EtudiantsService {
    constructor(
        @InjectRepository(Etudiants)
        private etudiantsRepository: Repository<Etudiants>
    ) {}

    async findOne(donnees: { id: number }): Promise<Etudiants> {
        return await this.etudiantsRepository
        .createQueryBuilder('e')
        .select([
            "e.id as id", "e.nom as nom", "e.prenoms as prenoms", 
            "e.prenom_usuel as prenom_usuel", "e.promotion as promotion", 
            "e.filiere as filiere", "e.ecole as ecole", "e.email as email"
        ])
        .where(`e.id=:identifiant`, { identifiant: donnees.id })
        .getRawOne();
    }

    async update(id_etudiants: number, donnees: EtudiantsUpdateDto): Promise<void> {
        await this.etudiantsRepository
        .createQueryBuilder('e')
        .update(Etudiants)
        .set({
            filiere: donnees.filiere,
            email: donnees.email,
            ecole: donnees.ecole
        })
        .where(`e.id=:identifiant`, { identifiant: id_etudiants })
        .execute();
    }
    
    private async verifyPassword(id_etudiants: number, 
        donnees: EtudiantsUpdatePasswordDto): Promise<Etudiants> {
        return await this.etudiantsRepository
        .createQueryBuilder('e')
        .select([ "e.id" ])
        .where(`e.id=:identifiant AND e.password=SHA2(:password, 256)`, {
            identifiant: id_etudiants,
            password: donnees.lastPassword
        })
        .getRawOne();
    }

    async updatePassword(id_etudiants: number, 
        donnees: EtudiantsUpdatePasswordDto): Promise<void> {
        const verify = await this.verifyPassword(id_etudiants, donnees);
        if(!donnees) throw new ForbiddenException("Credentials incorrects !");
        await this.etudiantsRepository
        .createQueryBuilder('e')
        .update(Etudiants)
        .set({
            password: donnees.newPassword
        })
        .where(`e.id=:identifiant`, { identifiant: id_etudiants })
        .execute();
    }
}
