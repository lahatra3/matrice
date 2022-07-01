import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiants } from 'src/output';
import { Repository } from 'typeorm';
import { AuthDto, AuthReponseDto, AuthReponseTokenDto, EtudiantsCreateDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Etudiants)
        private etudiantsRepository: Repository<Etudiants>,
        private jwtService: JwtService
    ) {}

    private async signEtudiants(donnees: AuthReponseDto): Promise<string> {
        return await this.jwtService.signAsync({
            id: donnees.id,
            prenom_usuel: donnees.prenom_usuel,
            filiere: donnees.filiere,
            ecole: donnees.ecole
        });
    }

    async authEtudiants(donnees: AuthDto): Promise<AuthReponseTokenDto> {
        const reponse = await this.etudiantsRepository
        .createQueryBuilder("e")
        .select([
            "e.id as id", "e.prenom_usuel as prenom_usuel", 
            "e.promotion as prenom_usuel", "e.filiere as filiere", 
            "e.ecole as ecole"
        ])
        .where(`(e.prenom_usuel=:identifiant OR e.email=:identifiant) 
            AND e.password=SHA2(:password, 256)`, {
                identifiant: donnees.identifiant,
                password: donnees.password
            })
        .getRawOne();
        if(!reponse) throw new UnauthorizedException("Credentials incorrects !");
        return {
            access_token: await this.signEtudiants(reponse)
        };
    }

    private async verifyEtudiants(donnees: EtudiantsCreateDto): Promise<Etudiants> {
        return await this.etudiantsRepository
        .createQueryBuilder('e')
        .select([ "e.id" ])
        .where(`(e.nom=:nom AND e.prenoms=:prenoms) 
            OR e.prenom_usuel=:prenom_usuel 
            OR e.password=:password`, {
                nom: donnees.nom,
                prenoms: donnees.prenoms,
                prenom_usuel: donnees.prenom_usuel,
                password: donnees.password
            })
        .getRawOne();
    }

    async createEtudiants(donnees: EtudiantsCreateDto): Promise<void> {
        const verify = await this.verifyEtudiants(donnees);
        if(verify) throw new NotAcceptableException("Credentials incorrects !");
        await this.etudiantsRepository
        .createQueryBuilder('e')
        .insert()
        .into(Etudiants)
        .values({
            nom: donnees.nom,
            prenoms: donnees.prenoms,
            prenomUsuel: donnees.prenom_usuel,
            promotion: donnees.promotion,
            filiere: donnees.filiere,
            ecole: donnees.ecole,
            password: donnees.password
        })
        .execute();
    }
}
