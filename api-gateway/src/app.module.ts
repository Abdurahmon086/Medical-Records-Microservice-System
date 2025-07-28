import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { VisitModule } from './modules/visit/visit.module';
import { NoteModule } from './modules/note/note.module';
import { AdminModule } from './modules/admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptins } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptins),
    ClientsModule.register([
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(process.cwd(), 'src/proto/doctor.proto'),
          url: 'localhost:50051',
        },
      },
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(process.cwd(), 'src/proto/patient.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'VISIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'visit',
          protoPath: join(process.cwd(), 'src/proto/visit.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'NOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(process.cwd(), 'src/proto/note.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    DoctorModule,
    PatientModule,
    VisitModule,
    NoteModule,
    AdminModule,
  ],
})
export class AppModule {}
