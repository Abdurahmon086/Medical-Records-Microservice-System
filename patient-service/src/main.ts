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
        package: ['patient', 'visit', 'note'],
        protoPath: [
          join(process.cwd(), 'src/proto/patient.proto'),
          join(process.cwd(), 'src/proto/visit.proto'),
          join(process.cwd(), 'src/proto/note.proto'),
        ],
        url: 'localhost:50052',
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
