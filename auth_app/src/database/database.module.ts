import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { ProfileEntity } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: `postgres://${configService.get('POSTGRES_USER')}:${configService.get('POSTGRES_PASSWORD')}@${configService.get('POSTGRES_HOST')}:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}`,
        // host: configService.get('POSTGRES_HOST'),
        // port: configService.get('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USER'),
        // password: configService.get('POSTGRES_PASSWORD'),
        // database: configService.get('POSTGRES_DB'),
        //entities: [ProfileEntity],
        synchronize: true,
        autoLoadEntities: true,
      })
    }),
  ],
})
export class DatabaseModule { }