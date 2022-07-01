export class MatricesCreateDto {
    inscription: number;
    fourniture: number;
    ecolage: number;
    frais_cyber: number;
    trajet_ville: number;
    trajet_region: number;
    voyage_etude: number;
    stage: number;
    autres_frais: number;
    explications: string;
    biblio: number;
}

export class MatricesUpdateDto {
    id: number;
    inscription: number;
    fourniture: number;
    ecolage: number;
    frais_cyber: number;
    trajet_ville: number;
    trajet_region: number;
    voyage_etude: number;
    stage: number;
    autres_frais: number;
    explications: string;
    biblio: number;
}