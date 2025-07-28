import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(process.cwd(), 'src/proto/patient.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
