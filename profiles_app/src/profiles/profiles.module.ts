/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
