import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    ClientsModule.register([
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../../proto/doctor.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
