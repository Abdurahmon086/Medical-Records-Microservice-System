import { Module } from '@nestjs/common';
import { PatientModule } from './modules/patient/patient.module';
import { VisitModule } from './modules/visit/visit.module';
import { NoteModule } from './modules/note/note.module';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PatientModule,
    VisitModule,
    NoteModule,
  ],
})
export class AppModule {}
