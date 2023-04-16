import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  const queueName = configService.get('RABBITMQ_QUEUE_NAME');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: 'auth',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });


  await app.startAllMicroservices();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Profile APP started on ${port} port`);

}
bootstrap();
