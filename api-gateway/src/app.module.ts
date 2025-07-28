import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { VisitModule } from './modules/visit/visit.module';
import { NoteModule } from './modules/note/note.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../proto/doctor.proto'),
        },
      },
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(__dirname, '../proto/patient.proto'),
        },
      },
      {
        name: 'VISIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'visit',
          protoPath: join(__dirname, '../proto/visit.proto'),
        },
      },
      {
        name: 'NOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(__dirname, '../proto/note.proto'),
        },
      },
      {
        name: 'ADMIN_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'admin',
          protoPath: join(__dirname, '../proto/admin.proto'),
        },
      },
    ]),
    DoctorModule,
    PatientModule,
    VisitModule,
    NoteModule,
    AdminModule
  ],
})
export class AppModule {}
