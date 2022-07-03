import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatricesData } from 'src/output';
import { SchedulerService } from './scheduler.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([MatricesData]),
        ScheduleModule.forRoot()
    ],
    providers: [SchedulerService],
})
export class SchedulerModule {}
