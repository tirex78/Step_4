# Учебное приложение на микросервисной архитектуре (NestJs)

### взаимодействие между микросервисами с помощью брокера сообщений RabbitMQ

1. Микросервис AUTH - авторизации и работы с пользователями 

2. Микросервис PROFILES - профили пользователей используются в микросервисе AUTH

Запуск тестовой сборки 

```js
// файл docker-compose.yml
docker compose up --build
```

Запускаются:
  - 5 контейнеров, 
    - 2 микросервиса
    - 2 базы данных для каждого микросервиса 
    - контейнер с брокером сообщений и админкой от него

Создаем гибридное приложение, для работы через HTTP и AMQP

```js
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
```
В контроллер добавляем "паттерн"
```js
  @MessagePattern({ cmd: 'get-all-users' })
  async findAllUserFromProfileService(
  ): Promise<any> {
    const res = await this.usersService.findAllUsers();
    return res;
  }
```


В микросервисе PROFILE пдключаем клиента
```js
provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: 'auth',
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
```
Для отправки запросов в контроллер инжектируем "клиента" и создаем запрос с "паттерном" который будет отлавливать наш микросервис прослушивая очередь брокера
```js
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
}
```