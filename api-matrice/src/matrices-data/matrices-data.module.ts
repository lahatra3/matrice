import { Module } from '@nestjs/common';
import { MatricesDataService } from './matrices-data.service';
import { MatricesDataController } from './matrices-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatricesData } from 'src/output';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatricesData])
  ],
  providers: [MatricesDataService],
  controllers: [MatricesDataController]
})
export class MatricesDataModule {}
