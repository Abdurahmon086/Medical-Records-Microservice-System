import { Module } from '@nestjs/common';
import { PatientModule } from './modules/patient/patient.module';
import { VisitModule } from './modules/visit/visit.module';
import { NoteModule } from './modules/note/note.module';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './modules/patient/patient.entity';
import { Visit } from './modules/visit/visit.entity';
import { Note } from './modules/note/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Patient, Visit, Note]),
    PatientModule,
    VisitModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
