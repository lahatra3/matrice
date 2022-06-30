import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Etudiants } from "./Etudiants";

@Index("fk_id_etudiants", ["idEtudiants"], {})
@Entity("matrices_data", { schema: "MATRICES" })
export class MatricesData {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_etudiants" })
  idEtudiants: number;

  @Column("datetime", {
    name: "date_creation",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreation: Date | null;

  @Column("int", { name: "inscription", nullable: true })
  inscription: number | null;

  @Column("int", { name: "fourniture", nullable: true })
  fourniture: number | null;

  @Column("int", { name: "ecolage", nullable: true })
  ecolage: number | null;

  @Column("int", { name: "frais_cyber", nullable: true })
  fraisCyber: number | null;

  @Column("int", { name: "trajet_ville", nullable: true })
  trajetVille: number | null;

  @Column("int", { name: "trajet_region", nullable: true })
  trajetRegion: number | null;

  @Column("int", { name: "voyage_etude", nullable: true })
  voyageEtude: number | null;

  @Column("int", { name: "stage", nullable: true })
  stage: number | null;

  @Column("int", { name: "autres_frais", nullable: true })
  autresFrais: number | null;

  @Column("text", { name: "explications", nullable: true })
  explications: string | null;

  @Column("int", { name: "biblio", nullable: true })
  biblio: number | null;

  @Column("int", { name: "total", nullable: true })
  total: number | null;

  @ManyToOne(() => Etudiants, (etudiants) => etudiants.matricesData, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_etudiants", referencedColumnName: "id" }])
  idEtudiants2: Etudiants;
}
