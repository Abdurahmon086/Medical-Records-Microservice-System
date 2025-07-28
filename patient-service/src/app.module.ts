import { Module } from '@nestjs/common';
import { PatientModule } from './modules/patient/patient.module';
import { VisitModule } from './modules/visit/visit.module';
import { NoteModule } from './modules/note/note.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [PatientModule, VisitModule, NoteModule, AdminModule],
})
export class AppModule {}
