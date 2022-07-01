import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Etudiants } from 'src/output';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forFeature([Etudiants]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
