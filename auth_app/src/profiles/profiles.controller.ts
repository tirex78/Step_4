import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor, Inject,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('profiles')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfilesController {
  constructor(
    @Inject('PROFILES_SERVICE') private profilesService: ClientProxy,
  ) { }

  @Public()
  @Get()
  //@UseGuards(JwtAuthGuard)
  async getProfiles() {
    return this.profilesService.send({ cmd: 'get-profiles' }, {})
  }

  @Post()
  //@UseGuards(JwtAuthGuard)
  async createProfile(@Body() profile: CreateProfileDto) {
    return this.profilesService.send({
      cmd: 'create-profile'
    }, profile)
  }
}
