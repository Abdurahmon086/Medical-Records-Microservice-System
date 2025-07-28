// src/main.ts
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
        package: ['patient', 'visit', 'note', 'admin'],
        protoPath: [
          join(__dirname, '../proto/patient.proto'),
          join(__dirname, '../proto/visit.proto'),
          join(__dirname, '../proto/note.proto'),
          join(__dirname, '../proto/admin.proto'),
        ],
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();
