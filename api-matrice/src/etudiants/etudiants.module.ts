import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiants } from 'src/output';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantsService } from './etudiants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Etudiants])
  ],
  controllers: [EtudiantsController],
  providers: [EtudiantsService]
})
export class EtudiantsModule {}
