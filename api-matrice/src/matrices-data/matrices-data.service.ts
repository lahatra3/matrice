import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiants, MatricesData } from 'src/output';
import { Repository } from 'typeorm';
import { MatricesCreateDto, MatricesUpdateDto } from './dto';

@Injectable()
export class MatricesDataService {
    constructor(
        @InjectRepository(MatricesData)
        private matricesDataRepository: Repository<MatricesData>
    ) {}

    async findOne(donnees: { id: number }): Promise<MatricesData[]> {
        return await this.matricesDataRepository
        .createQueryBuilder('m')
        .select([
            "m.id as id", "m.date_creation as date_creation", 
            "m.inscription as inscription", "m.fourniture as fourniture",
            "m.ecolage as ecolage", "m.frais_cyber as frais_cyber", 
            "m.trajet_ville as trajet_ville", "m.trajet_region as trajet_region",
            "m.voyage_etude as voyage_etude", "m.stage as stage", 
            "m.autres_frais as autres_frais", "m.explications as explications",
            "m.biblio as biblio", "m.total as total", 
            "e.prenom_usuel as prenom_usuel", "e.promotion as promotion"
        ])
        .innerJoin(Etudiants, "e", "m.id_etudiants=e.id")
        .where(`e.id=:identifiant`, { identifiant: donnees.id })
        .orderBy('m.id', 'DESC')
        .getRawMany();
    }

    async create(id_etudiants: number, 
        donnees: MatricesCreateDto): Promise<void> {
        const sommeData = (
            donnees.inscription + donnees.fourniture 
            + donnees.ecolage + donnees.frais_cyber 
            + donnees.trajet_ville + donnees.trajet_region 
            + donnees.voyage_etude + donnees.stage 
            + donnees.autres_frais + donnees.biblio);

        await this.matricesDataRepository
        .createQueryBuilder()
        .insert()
        .into(MatricesData)
        .values({
            idEtudiants: id_etudiants,
            inscription: donnees.inscription,
            fourniture: donnees.fourniture,
            ecolage: donnees.ecolage,
            fraisCyber: donnees.frais_cyber,
            trajetVille: donnees.trajet_ville,
            trajetRegion: donnees.trajet_region,
            voyageEtude: donnees.voyage_etude,
            stage: donnees.stage,
            autresFrais: donnees.autres_frais,
            explications: donnees.explications,
            biblio: donnees.biblio,
            total: sommeData
        })
        .execute();
    }

    async update(id_etudiants: number, 
        donnees: MatricesUpdateDto):Promise<void> {
        const sommeData = (
            donnees.inscription + donnees.fourniture 
            + donnees.ecolage + donnees.frais_cyber 
            + donnees.trajet_ville + donnees.trajet_region 
            + donnees.voyage_etude + donnees.stage 
            + donnees.autres_frais + donnees.biblio);

        await this.matricesDataRepository
        .createQueryBuilder('m')
        .update(MatricesData)
        .set({
            inscription: donnees.inscription,
            fourniture: donnees.fourniture,
            ecolage: donnees.ecolage,
            fraisCyber: donnees.frais_cyber,
            trajetVille: donnees.trajet_ville,
            trajetRegion: donnees.trajet_region,
            voyageEtude: donnees.voyage_etude,
            stage: donnees.stage,
            autresFrais: donnees.autres_frais,
            explications: donnees.explications,
            biblio: donnees.biblio,
            total: sommeData
        })
        .where(`m.id=:id AND m.id_etudiants=:identifiant`, {
            id: donnees.id,
            identifiant: id_etudiants
        })
        .execute();
    }
}
