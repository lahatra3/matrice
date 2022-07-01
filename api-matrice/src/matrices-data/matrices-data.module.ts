import { Module } from '@nestjs/common';
import { MatricesDataService } from './matrices-data.service';
import { MatricesDataController } from './matrices-data.controller';

@Module({
  providers: [MatricesDataService],
  controllers: [MatricesDataController]
})
export class MatricesDataModule {}
