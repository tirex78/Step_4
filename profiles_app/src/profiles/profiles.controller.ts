/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profiles.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) { }

  @Post('create')
  async createProfileLocal(@Payload() profile: CreateProfileDto) {
    return await this.profilesService.createProfile(profile);
  }

  @MessagePattern({ cmd: 'create-profile' })
  async createProfile(@Payload() profile: CreateProfileDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return await this.profilesService.createProfile(profile);
  }
  //@Get('find')
  @MessagePattern({ cmd: 'get-profiles' })

  async getAllProfiles(@Ctx() context: RmqContext) {

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return await this.profilesService.getAllProfiles();
    //   return { user: 'TEST - WORK' }
  }
}
