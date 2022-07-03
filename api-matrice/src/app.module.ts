import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiants, MatricesData } from './output';
import { AuthModule } from './auth/auth.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { MatricesDataModule } from './matrices-data/matrices-data.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [ Etudiants, MatricesData ],
      autoLoadEntities: true
    }),
    AuthModule, EtudiantsModule,
    MatricesDataModule, SchedulerModule
  ]
})
export class AppModule {}
