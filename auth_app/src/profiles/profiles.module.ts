import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProfilesController } from './profiles.controller';


//connected to profile services
@Module({
  imports: [ConfigModule],
  controllers: [ProfilesController],
  providers: [
    {
      provide: 'PROFILES_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: 'profile',
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    }
  ],
})
export class ProfilesModule { }