import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VISIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'visit',
          protoPath: join(__dirname, '../../../proto/visit.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
