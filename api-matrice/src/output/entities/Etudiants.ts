import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MatricesData } from "./MatricesData";

@Entity("etudiants", { schema: "MATRICES" })
export class Etudiants {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 255 })
  nom: string;

  @Column("varchar", { name: "prenoms", length: 255 })
  prenoms: string;

  @Column("varchar", { name: "prenom_usuel", length: 255 })
  prenomUsuel: string;

  @Column("varchar", { name: "promotion", length: 10 })
  promotion: string;

  @Column("varchar", { name: "filiere", length: 255 })
  filiere: string;

  @Column("varchar", { name: "ecole", length: 255 })
  ecole: string;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("text", { name: "password" })
  password: string;

  @OneToMany(() => MatricesData, (matricesData) => matricesData.idEtudiants2)
  matricesData: MatricesData[];
}
