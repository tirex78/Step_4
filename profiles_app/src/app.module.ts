/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileModule } from './profiles/profiles.module';
import { DatabaseModule } from './database/database.module';
import { ProfileEntity } from './profiles/entities/profile.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    DatabaseModule,
    ProfileModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule { }
