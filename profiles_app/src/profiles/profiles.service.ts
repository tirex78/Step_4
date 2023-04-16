/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
  ) { }

  async createProfile(profile: CreateProfileDto) {
    const newProfile = this.profilesRepository.create(profile);
    await this.profilesRepository.save(newProfile);
    return newProfile;
  }

  async getAllProfiles() {
    return await this.profilesRepository.find();
  }
}
