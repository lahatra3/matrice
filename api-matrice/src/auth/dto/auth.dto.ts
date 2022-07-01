export class AuthDto {
    identifiant: string;
    password: string;
}

export class AuthReponseDto {
    id: number;
    prenom_usuel: string;
    filiere: string;
    ecole: string;
}

export class AuthReponseTokenDto {
    access_token: string;
}

export class EtudiantsCreateDto {
    nom: string;
    prenoms: string;
    prenom_usuel: string;
    promotion: string;
    filiere: string;
    ecole: string;
    password: string;
}
