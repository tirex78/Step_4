/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private authService: ClientProxy
  ) { }

  @Get()
  async getUsers() {
    const res = this.authService.send({
      cmd: 'get-all-users'
    }, '')
    return res
  }

  @Post('add')
  async createUserProfile(@Body() profile: any) {
    return this.authService.send({
      cmd: 'create-user'
    }, profile)
  }
}

