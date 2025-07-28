import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/doctor.proto'),
        package: 'doctor',
        url: 'localhost:50051',
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
